locals {
  subscription_id = "1fc2278a-be10-4749-90f3-cf0276470cf7"

  location      = "UK South"
  location_key  = "uks"
  site_location = "West Europe"

  log_workspace_id     = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-management/providers/Microsoft.OperationalInsights/workspaces/log-uks-management"
  container_env_id     = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-containers/providers/Microsoft.App/managedEnvironments/env-uks-containers"

  tags = {
    deployment_type : "terraform"
  }
}
