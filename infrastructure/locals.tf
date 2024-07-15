locals {
  subscription_id = "1fc2278a-be10-4749-90f3-cf0276470cf7"

  location      = "UK South"
  location_key  = "uks"
  site_location = "West Europe"

  secrets_key_vault_id = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-terraform/providers/Microsoft.KeyVault/vaults/kv-tf-discord-hof"
  log_workspace_id     = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-management/providers/Microsoft.OperationalInsights/workspaces/log-uks-management"
  container_env_id     = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-containers/providers/Microsoft.App/managedEnvironments/env-uks-containers"

  tags = {
    deployment_type : "terraform"
  }

  app_secret_name_db_conn = "database-connection-string"
  port                    = "5000"
}

data "azurerm_key_vault_secret" "db_conn_string" {
  key_vault_id = local.secrets_key_vault_id
  name         = "db-connection-string"
}
