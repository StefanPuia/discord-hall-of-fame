terraform {
  backend "azurerm" {
    subscription_id      = "1fc2278a-be10-4749-90f3-cf0276470cf7"
    resource_group_name  = "rg-terraform"
    storage_account_name = "spuksterraform"
    container_name       = "discord-hall-of-fame"
    key                  = "discord-hall-of-fame.tfstate"
    use_oidc             = true
  }
}

provider "azurerm" {
  subscription_id = local.subscription_id
  features {}
}

resource "azurerm_resource_group" "rg" {
  location = local.location
  name     = "discord-hall-of-fame"
  tags     = local.tags
}

resource "azurerm_storage_account" "storage" {
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = local.location
  name                     = "discordhalloffame"
  account_replication_type = "LRS"
  account_tier             = "Standard"
  tags                     = local.tags
}

resource "azurerm_storage_container" "uploads" {
  name                 = "uploads"
  storage_account_name = azurerm_storage_account.storage.name
}

resource "azurerm_storage_share" "config" {
  name                 = "config"
  quota                = 1
  storage_account_name = azurerm_storage_account.storage.name
}

resource "azurerm_application_insights" "appi" {
  application_type    = "web"
  location            = local.location
  name                = "appi-discord-hall-of-fame"
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = local.log_workspace_id
  tags                = local.tags
}

resource "azurerm_static_web_app" "site" {
  location            = local.site_location
  name                = "discord-hall-of-fame"
  resource_group_name = azurerm_resource_group.rg.name
  tags = merge(
    local.tags,
    {
      "hidden-link: /app-insights-conn-string" : azurerm_application_insights.appi.connection_string,
      "hidden-link: /app-insights-instrumentation-key" : azurerm_application_insights.appi.instrumentation_key,
      "hidden-link: /app-insights-resource-id" : azurerm_application_insights.appi.id,
    }
  )

  app_settings = {
    APPLICATIONINSIGHTS_CONNECTION_STRING : azurerm_application_insights.appi.connection_string
    MONGODB_CONN_URL : azurerm_cosmosdb_account.account.primary_mongodb_connection_string
    MONGODB_DATABASE : azurerm_cosmosdb_mongo_database.hof_prod.name
    BLOB_STORAGE_ACCOUNT : azurerm_storage_account.storage.name
    BLOB_STORAGE_KEY : azurerm_storage_account.storage.primary_access_key
    DISCORD_CLIENT_ID : data.azurerm_key_vault_secret.discord_client_id
    DISCORD_CLIENT_SECRET : data.azurerm_key_vault_secret.discord_client_secret
    DISCORD_BOT_ID : data.azurerm_key_vault_secret.discord_bot_id
    DISCORD_BOT_TOKEN : data.azurerm_key_vault_secret.discord_bot_token
  }
}

resource "azurerm_container_app_environment_storage" "config" {
  name                         = "discord-hof-dab-config"
  account_name                 = azurerm_storage_account.storage.name
  share_name                   = azurerm_storage_share.config.name
  access_key                   = azurerm_storage_account.storage.primary_access_key
  access_mode                  = "ReadOnly"
  container_app_environment_id = local.container_env_id
}
