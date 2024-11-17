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
]
