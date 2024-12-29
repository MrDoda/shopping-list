import { users } from '../mocks/users.ts'
import { ShoppingList, User } from '../types/types.ts'
import { createStore } from './store.tsx'

interface AppState {
  token?: string
  alerts: Record<string, string>
  user?: User
  shoppingLists: Array<ShoppingList>
  themeMode: 'light' | 'dark'
  language: 'en' | 'cs'
}

const initialState: AppState = {
  alerts: {},
  shoppingLists: [],
  user: users[users.length - 2],
  themeMode: 'light',
  language: 'en',
}

const appStore = createStore(initialState)

export { appStore }
