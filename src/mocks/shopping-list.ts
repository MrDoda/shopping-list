import { ShoppingList } from '../types/types'
import { members } from './members'
import { owner } from './owner'

export const shoppingListObject: ShoppingList = {
  id: '1',
  name: 'Nákupní seznam 4',
  ownerId: owner.id,
  members,
  items: [
    {
      id: '1',
      content: 'Item on a shopping list.',
      ownerId: '2',
    },
    {
      id: '2',
      content: 'Item on a shopping list. - completed',
      ownerId: '1',
      done: true,
    },
  ],
}
