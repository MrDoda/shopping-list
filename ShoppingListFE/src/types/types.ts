export interface User {
  name: string
  id: string
}

export interface ShoppingListItem {
  id: string
  content: string
  ownerId: string
  done?: boolean
}

export interface ShoppingList {
  id: string
  ownerId: string
  items: Array<ShoppingListItem>
  members: Array<User>
  name: string
  hideComplete?: boolean
  archived?: boolean
}
