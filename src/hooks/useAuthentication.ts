import { request } from '../api/request.js'
import { addAlert } from '../utils/addAlert.js'

export interface Credentials {
  email: string
  password: string
}

export interface RegisterDetails extends Credentials {
  name: string
}

export const useAuthentication = () => {
  const login = async (credentials: Credentials) => {
    const [error, result] = await request<{ token: string }>(
      'auth/login',
      credentials
    )
    if (error) {
      console.error('Error logging in:', error)
      addAlert({
        key: 'login',
        message: error?.message || 'Unknown login error.',
      })
      return null
    }
    return result
  }

  const register = async (userDetails: RegisterDetails) => {
    const [error] = await request('auth/register', userDetails)
    if (error) {
      console.error('Error registering:', error)
      addAlert({ key: 'register', message: error.message })
      return false
    }
    return true
  }

  return {
    login,
    register,
  }
}
