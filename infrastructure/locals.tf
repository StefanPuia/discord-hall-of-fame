locals {
  subscription_id = "1fc2278a-be10-4749-90f3-cf0276470cf7"

  location     = "UK South"
  location_key = "uks"

  host_snet_id = "/subscriptions/1fc2278a-be10-4749-90f3-cf0276470cf7/resourceGroups/rg-uks-network/providers/Microsoft.Network/virtualNetworks/vnet-uks-core/subnets/virtual-machines"

  tags = {
    deployment_type : "terraform"
  }
}
