import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ShoppingList } from '../types/types'
import { AddShoppingListModal } from '../Components/AddShoppingListModal'
import { DeleteConfirmationModal } from '../Components/DeleteConfirmationModal'
import { ArchiveToggle } from '../Components/ArchiveToggle'
import { ShoppingListsGrid } from '../Components/ShoppingListsGrid'
import { useStore } from '../store/useStore'
import { appStore } from '../store/appStore'
import { useShoppingList } from '../hooks/useShoppingList'
import { useIntl } from 'react-intl'

export const Home = () => {
  const [showArchived, setShowArchived] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])
  const user = useStore(appStore, 'user')
  const { getAllShoppingLists, createShoppingList, deleteShoppingList } =
    useShoppingList()
  const intl = useIntl()

  useEffect(() => {
    const loadShoppingLists = async () => {
      const result = await getAllShoppingLists()
      result && setShoppingLists(result)
    }
    loadShoppingLists()
  }, [])

  const handleAddShoppingList = async (name: string) => {
    const newList: ShoppingList = {
      id: '',
      ownerId: user?.id || '',
      items: [],
      members: [{ id: user?.id || '', name: user?.name || '' }],
      name,
    }
    const result = await createShoppingList(newList)
    if (result) {
      setShoppingLists((prev) => [...prev, result])
      setModalOpen(false)
    }
  }

  const handleDeleteShoppingList = async () => {
    if (selectedListId) {
      const success = await deleteShoppingList(selectedListId)
      if (success) {
        setShoppingLists((prev) =>
          prev.filter((list) => list.id !== selectedListId)
        )
      }
      setDeleteDialogOpen(false)
      setSelectedListId(null)
    }
  }

  const handleDeleteList = (listId: string) => {
    setSelectedListId(listId)
    setDeleteDialogOpen(true)
  }

  const handleAddShoppingListClick = () => {
    setModalOpen(true)
  }

  if (!user)
    return <div>{intl.formatMessage({ id: 'home.error.userNotFound' })}</div>

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {intl.formatMessage({ id: 'home.title' })}
      </Typography>
      <ArchiveToggle
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />
      <ShoppingListsGrid
        user={user}
        shoppingLists={shoppingLists}
        showArchived={showArchived}
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
