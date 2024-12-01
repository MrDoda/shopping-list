import { request } from '../api/request'
import { User } from '../types/types'
import { addAlert } from '../utils/addAlert'

export const useUsers = () => {
  const getUsers = async () => {
    const [error, result] = await request<Array<User>>(
      `user/`,
      undefined,
      'GET'
    )
    if (error || !result) {
      console.error('Error getting users:', error)
      addAlert({
        key: 'get-all-users',
        message: error?.message || 'Users failed to load.',
      })
      return null
    }
    return result
  }

  const getMyself = async () => {
    const [error, result] = await request<User>(`user/me`, undefined, 'GET')
    if (error || !result) {
      console.error('Error getting myself:', error)
      addAlert({
        key: 'get-myself',
        message: error?.message || 'User failed to load.',
      })
      return null
    }
    return result
  }

  return {
    getUsers,
    getMyself,
  }
}
