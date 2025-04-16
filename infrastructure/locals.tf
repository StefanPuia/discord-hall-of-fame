locals {
  subscription_id = "1fc2278a-be10-4749-90f3-cf0276470cf7"

  location      = "UK South"
  location_key  = "uks"
  site_location = "West Europe"

  log_workspace_id = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-management/providers/Microsoft.OperationalInsights/workspaces/log-uks-management"
  container_env_id = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-containers/providers/Microsoft.App/managedEnvironments/env-uks-containers"
  kv_id            = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-terraform/providers/Microsoft.KeyVault/vaults/kv-tf-discord-hof"

  tags = {
    deployment_type : "terraform"
  }
}

data "azurerm_key_vault_secret" "discord_client_id" {
  key_vault_id = local.kv_id
  name         = "discord-client-id"
}

data "azurerm_key_vault_secret" "discord_client_secret" {
  key_vault_id = local.kv_id
  name         = "discord-client-secret"
}

data "azurerm_key_vault_secret" "discord_bot_id" {
  key_vault_id = local.kv_id
  name         = "discord-bot-id"
}

data "azurerm_key_vault_secret" "discord_bot_token" {
  key_vault_id = local.kv_id
  name         = "discord-bot-token"
}
