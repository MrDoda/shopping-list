import { Grid } from '@mui/material'
import { ShoppingList, User } from '../types/types'
import { ShoppingListCard } from './ShoppingListCard'
import { AddShoppingListCard } from './AddShoppingListCard'

interface ShoppingListsGridProps {
  shoppingLists: ShoppingList[]
  showArchived: boolean
  onToggleItemDone: (listId: string, itemId: string) => void
  onDeleteList: (listId: string) => void
  onAddShoppingListClick: () => void
  user: User
}

export const ShoppingListsGrid = ({
  shoppingLists,
  showArchived,
  onToggleItemDone,
  onDeleteList,
  onAddShoppingListClick,
  user,
}: ShoppingListsGridProps) => (
  <Grid
    container
    spacing={1}
    justifyContent="flex-start"
    alignItems="flex-start"
  >
    {shoppingLists
      .filter((list) => (showArchived ? true : !list.archived))
      .map((list) => (
        <ShoppingListCard
          key={list.id}
          list={list}
          onToggleItemDone={onToggleItemDone}
          onDeleteList={onDeleteList}
          isOwner={user.id == list.ownerId}
        />
      ))}
    <AddShoppingListCard onClick={onAddShoppingListClick} />
  </Grid>
)