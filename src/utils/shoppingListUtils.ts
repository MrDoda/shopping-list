import { ShoppingList, ShoppingListItem, User } from '../types/types'

export const updateShoppingList =
  <K extends keyof ShoppingList>(
    nameOfProperty: K,
    shoppingList: ShoppingList,
    patchShopList: (s: ShoppingList) => void
  ) =>
  (newValue: ShoppingList[K]) => {
    shoppingList[nameOfProperty] = newValue
    patchShopList(shoppingList)
  }

export const updateShoppingListItem =
  (
    itemId: string,
    shoppingList: ShoppingList,
    patchShopList: (s: ShoppingList) => void
  ) =>
  <K extends keyof ShoppingListItem>(
    property: K,
    newValue: ShoppingListItem[K]
  ) => {
    const itemIndex = shoppingList.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) {
      throw new Error(`Item with id ${itemId} not found`)
    }

    shoppingList.items[itemIndex][property] = newValue
    patchShopList(shoppingList)
  }

export const updateShoppingListMember =
  (
    memberId: string,
    shoppingList: ShoppingList,
    patchShopList: (s: ShoppingList) => void
  ) =>
  <K extends keyof User>(property: K, newValue: User[K]) => {
    const memberIndex = shoppingList.members.findIndex(
      (member) => member.id === memberId
    )
    if (memberIndex === -1) {
      throw new Error(`Member with id ${memberId} not found`)
    }

    shoppingList.members[memberIndex][property] = newValue
    patchShopList(shoppingList)
  }

export const addShoppingListMember = (
  newMember: User,
  shoppingList: ShoppingList,
  patchShopList: (s: ShoppingList) => void
) => {
  shoppingList.members.push(newMember)
  patchShopList(shoppingList)
}

export const removeShoppingListMember = (
  memberId: string,
  shoppingList: ShoppingList,
  patchShopList: (s: ShoppingList) => void
) => {
  shoppingList.members = shoppingList.members.filter(
    (member) => member.id !== memberId
  )
  patchShopList(shoppingList)
}
