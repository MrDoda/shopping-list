import { request } from '../api/request.js'
import { User } from '../types/types.js'
import { addAlert } from '../utils/addAlert.js'

export const useShoppingListMember = (shoppingListId: string) => {
  const addShoppingListMember = async (member: User) => {
    const [error, result] = await request<User>(
      `shopping-list/${shoppingListId}/member`,
      member,
      'POST'
    )
    if (error) {
      console.error('Error adding shopping-list member:', error)
      addAlert({ key: 'shopping-list-member-add', message: error?.message })
      return null
    }
    return result
  }

  const removeShoppingListMember = async (memberId: string) => {
    const [error] = await request<void>(
      `shopping-list/${shoppingListId}/member`,
      { id: memberId },
      'DELETE'
    )
    if (error) {
      console.error('Error removing shopping-list member:', error)
      addAlert({ key: 'shopping-list-member-remove', message: error?.message })
      return false
    }
    return true
  }

  return {
    addShoppingListMember,
    removeShoppingListMember,
  }
}
