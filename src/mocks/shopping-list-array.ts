import { shoppingListObject } from './shopping-list'

export const shoppingListArray = [
  {
    id: 'X',
    ownerId: '4',
    items: [
      { id: 'item1', content: 'Apples', ownerId: 'user1', done: true },
      { id: 'item2', content: 'Bananas', ownerId: 'user1' },
    ],
    members: [{ id: 'user2', name: 'Bob' }],
    name: 'Groceries',
  },
  {
    id: '2',
    ownerId: '4',
    items: [
      { id: 'item3', content: 'Detergent', ownerId: 'user2' },
      { id: 'item4', content: 'Toothpaste', ownerId: 'user2' },
    ],
    members: [{ id: 'user1', name: 'Alice' }],
    name: 'Household Supplies',
  },
  {
    id: '3',
    ownerId: '4',
    items: [
      { id: 'item5', content: 'Detergent', ownerId: 'user2' },
      { id: 'item6', content: 'Toothpaste', ownerId: 'user2' },
      { id: 'item7', content: 'Toothpastxe', ownerId: 'user2' },
    ],
    members: [{ id: 'user1', name: 'Alice' }],
    name: 'Something archived',
    archived: true,
  },
  shoppingListObject,
]
