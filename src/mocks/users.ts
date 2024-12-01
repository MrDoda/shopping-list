import { members } from './members'
import { owner } from './owner'

export const users = [
  ...members,
  owner,
  {
    name: 'Random Marine',
    id: '37',
  },
  {
    name: 'Random Bunny',
    id: '374',
  },
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
]
