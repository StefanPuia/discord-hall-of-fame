resource "azurerm_cosmosdb_account" "account" {
  location            = local.location
  name                = "dbac-${local.location_key}-discord-hof"
  offer_type          = "Standard"
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "MongoDB"

  is_virtual_network_filter_enabled = true

  virtual_network_rule {
    id = local.host_snet_id
  }

  capabilities {
    name = "EnableServerless"
  }

  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "Eventual"
  }

  geo_location {
    failover_priority = 0
    location          = local.location
  }
}

resource "azurerm_cosmosdb_mongo_database" "hof_prod" {
  account_name        = azurerm_cosmosdb_account.account.name
  name                = "hof-prod"
  resource_group_name = azurerm_resource_group.rg.name
}
