import { users } from '../mocks/users.ts'
import { ShoppingList, User } from '../types/types.ts'
import { createStore } from './store.tsx'

interface AppState {
  token?: string
  alerts: Record<string, string>
  user?: User
  shoppingLists: Array<ShoppingList>
}

const initialState: AppState = {
  alerts: {},
  shoppingLists: [],
  user: users[users.length - 2],
}

const appStore = createStore(initialState)

export { appStore }
