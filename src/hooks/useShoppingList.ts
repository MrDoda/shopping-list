import { request } from '../api/request.js'
import { ShoppingList } from '../types/types.js'
import { addAlert } from '../utils/addAlert.js'

export const useShoppingList = () => {
  const getShoppingListDetail = async (id?: string) => {
    const [error, result] = await request<ShoppingList>(
      `shopping-list/${id}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error('Error getting shopping-list:', error)
      addAlert({ key: 'shopping-list-detail', message: error?.message })
      return null
    }
    return result
  }

  const patchShoppingList = async (shoppingList: ShoppingList) => {
    const [error, result] = await request<ShoppingList>(
      `shopping-list/${shoppingList.id}`,
      shoppingList,
      'PATCH'
    )
    if (error) {
      console.error('Error updating shopping-list:', error)
      addAlert({ key: 'shopping-list-update', message: error?.message })
      return null
    }
    return result
  }

  const getAllShoppingLists = async () => {
    const [error, result] = await request<ShoppingList[]>(
      'shopping-list',
      undefined,
      'GET'
    )
    if (error) {
      console.error('Error fetching shopping lists:', error)
      addAlert({ key: 'shopping-list-fetch', message: error?.message })
      return null
    }
    return result
  }

  return {
    getShoppingListDetail,
    patchShoppingList,
    getAllShoppingLists,
  }
}
