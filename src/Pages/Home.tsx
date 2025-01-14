// Home.tsx

// Add these imports at the top (if not already there)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// ...existing imports...
import { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
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
      if (result) {
        setShoppingLists(result)
      }
    }
    loadShoppingLists()
  }, [])

  const handleAddShoppingList = async (name: string) => {
    if (!user) return
    const newList: ShoppingList = {
      id: '',
      ownerId: user.id,
      items: [],
      members: [{ id: user.id, name: user.name }],
      name,
    }
    const createdList = await createShoppingList(newList)
    if (createdList) {
      setShoppingLists((prev) => [...prev, createdList])
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

  if (!user) {
    return <div>{intl.formatMessage({ id: 'home.error.userNotFound' })}</div>
  }

  const filteredLists = shoppingLists.filter((list) =>
    showArchived ? true : !list.archived
  )

  const chartData = filteredLists.map((list) => {
    const done = list.items.filter((item) => item.done).length
    const notDone = list.items.length - done

    return {
      name: list.name,
      [intl.formatMessage({ id: 'home.done' })]: done,
      [intl.formatMessage({ id: 'home.notDone' })]: notDone,
    }
  })

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {intl.formatMessage({ id: 'home.title' })}
      </Typography>

      <ArchiveToggle
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />

      <Box m={'auto'} mb={7} sx={{ maxWidth: 300, maxHeight: 300 }}>
        <Paper sx={{ pr: 5 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.shoppingListsOverview' })}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey={intl.formatMessage({ id: 'home.done' })}
                stackId="items"
                fill="#82ca9d"
              />
              <Bar
                dataKey={intl.formatMessage({ id: 'home.notDone' })}
                stackId="items"
                fill="#8884d8"
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

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
