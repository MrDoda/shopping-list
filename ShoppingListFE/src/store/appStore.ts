import { User } from '../types/types.ts'
import { createStore } from './store.tsx'

interface AppState {
  token?: string
  alerts: Record<string, string>
  user?: User
}

const initialState: AppState = {
  alerts: {},
}

const appStore = createStore(initialState)

export { appStore }
