import { request } from '../api/request.js'
import { ShoppingListItem } from '../types/types.js'
import { addAlert } from '../utils/addAlert.js'

export const useShoppingListItem = (shoppingListId: string) => {
  const createShoppingListItem = async (item: ShoppingListItem) => {
    const [error, result] = await request<ShoppingListItem>(
      `shopping-list/${shoppingListId}/item`,
      item,
      'POST'
    )
    if (error) {
      console.error('Error creating shopping-list item:', error)
      addAlert({ key: 'shopping-list-item-create', message: error?.message })
      return null
    }
    return result
  }

  const patchShoppingListItem = async (item: ShoppingListItem) => {
    const [error, result] = await request<ShoppingListItem>(
      `shopping-list/${shoppingListId}/item`,
      item,
      'PATCH'
    )
    if (error) {
      console.error('Error updating shopping-list item:', error)
      addAlert({ key: 'shopping-list-item-update', message: error?.message })
      return null
    }
    return result
  }

  const deleteShoppingListItem = async (itemId: string) => {
    const [error] = await request<void>(
      `shopping-list/${shoppingListId}/item`,
      { id: itemId },
      'DELETE'
    )
    if (error) {
      console.error('Error deleting shopping-list item:', error)
      addAlert({ key: 'shopping-list-item-delete', message: error?.message })
      return false
    }
    return true
  }

  return {
    createShoppingListItem,
    patchShoppingListItem,
    deleteShoppingListItem,
  }
}
