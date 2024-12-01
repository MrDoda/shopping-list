import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ShoppingList } from '../types/types'
import { AddShoppingListModal } from '../Components/AddShoppingListModal'
import { DeleteConfirmationModal } from '../Components/DeleteConfirmationModal'
import { shoppingListArray } from '../mocks/shopping-list-array'
import { ArchiveToggle } from '../Components/ArchiveToggle'
import { ShoppingListsGrid } from '../Components/ShoppingListsGrid'
import { useStore } from '../store/useStore'
import { appStore } from '../store/appStore'
import { useShoppingList } from '../hooks/useShoppingList'

export const Home = () => {
  const [showArchived, setShowArchived] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])
  const user = useStore(appStore, 'user')
  const { getAllShoppingLists } = useShoppingList()

  useEffect(() => {
    const loadShoppingLists = async () => {
      const result = await getAllShoppingLists()
      result && setShoppingLists(result)
    }
    loadShoppingLists()
  }, [])

  const handleAddShoppingList = (name: string) => {
    const newList: ShoppingList = {
      id: Math.random().toString(36).substring(7),
      ownerId: 'user1',
      items: [],
      members: [{ id: 'user1', name: 'Alice' }],
      name,
    }
    setShoppingLists((prev) => [...prev, newList])
  }

  const handleDeleteShoppingList = () => {
    if (selectedListId) {
      setShoppingLists((prev) =>
        prev.filter((list) => list.id !== selectedListId)
      )
      setDeleteDialogOpen(false)
      setSelectedListId(null)
    }
  }

  const handleToggleItemDone = (listId: string, itemId: string) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : list
      )
    )
  }

  const handleDeleteList = (listId: string) => {
    setSelectedListId(listId)
    setDeleteDialogOpen(true)
  }

  const handleAddShoppingListClick = () => {
    setModalOpen(true)
  }

  if (!user) return <div>Application error. User not found...</div>

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Shopping Lists
      </Typography>
      <ArchiveToggle
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />
      <ShoppingListsGrid
        user={user}
        shoppingLists={shoppingLists}
        showArchived={showArchived}
        onToggleItemDone={handleToggleItemDone}
        onDeleteList={handleDeleteList}
        onAddShoppingListClick={handleAddShoppingListClick}
      />
      <AddShoppingListModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddShoppingList}
      />
      <DeleteConfirmationModal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteShoppingList}
      />
    </Box>
  )
}
