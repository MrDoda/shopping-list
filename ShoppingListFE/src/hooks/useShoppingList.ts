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

  return {
    getShoppingListDetail,
  }
}
