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
