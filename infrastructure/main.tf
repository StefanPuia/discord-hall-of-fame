terraform {
  backend "azurerm" {}
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

resource "azurerm_static_site" "site" {
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

resource "azurerm_container_app" "dab" {
  name                         = "app-${local.location_key}-discord-hall-of-fame-dab"
  container_app_environment_id = local.container_env_id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"
  workload_profile_name        = "Consumption"

  secret {
    name  = local.app_secret_name_db_conn
    value = data.azurerm_key_vault_secret.db_conn_string.value
  }

  ingress {
    target_port      = local.port
    external_enabled = true
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    max_replicas = 1

    container {
      name   = "discord-hof-dab"
      image  = "mcr.microsoft.com/azure-databases/data-api-builder:latest"
      cpu    = "0.25"
      memory = "0.5Gi"
      command = ["dotnet", "Azure.DataApiBuilder.Service.dll", "--ConfigFileName", "/cfg/dab-config.json"]

      env {
        name        = "DATABASE_CONNECTION_STRING"
        secret_name = local.app_secret_name_db_conn
      }

      volume_mounts {
        name = "config"
        path = "/cfg"
      }
    }

    volume {
      name         = "config"
      storage_name = azurerm_container_app_environment_storage.config.name
      storage_type = "AzureFile"
    }
  }
}