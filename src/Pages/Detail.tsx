import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Paper } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShoppingList } from '../types/types'
import {
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ShoppingListComponent } from '../Components/ShoppingListComponent'
import { UserShoppingListManagement } from '../Components/UserShoppingListManagement'
import { useShoppingList } from '../hooks/useShoppingList'
import { useIntl } from 'react-intl'
import { CustomTooltip } from '../Components/CustomTooltip'

export const Detail = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams()
  const { getShoppingListDetail, patchShoppingList } = useShoppingList()
  const navigate = useNavigate()
  const debounceTimer = useRef<any>(null)
  const intl = useIntl()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const listFromApi = await getShoppingListDetail(id)
      if (listFromApi) {
        setShoppingList(listFromApi)
      }
      setLoading(false)
    }
    load()
  }, [id])

  const changeShoppingList = async (
    patchedShoppingList: Partial<ShoppingList>
  ) => {
    setShoppingList((original) =>
      original ? { ...original, ...patchedShoppingList } : null
    )

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    debounceTimer.current = setTimeout(async () => {
      if (id && shoppingList) {
        const updatedShoppingList = { ...shoppingList, ...patchedShoppingList }
        const result = await patchShoppingList(updatedShoppingList)
        if (!result) {
          console.error('Failed to patch shopping list')
          setShoppingList(shoppingList)
        }
      }
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 100px)"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!shoppingList) {
    return (
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        {intl.formatMessage({ id: 'detail.error' })}
      </Box>
    )
  }

  const doneItems = shoppingList.items.filter((item) => item.done)
  const notDoneItems = shoppingList.items.filter((item) => !item.done)

  const pieData = [
    {
      name: intl.formatMessage({ id: 'home.done' }),
      value: doneItems.length,
      items: doneItems.map((i) => i.content),
    },
    {
      name: intl.formatMessage({ id: 'home.notDone' }),
      value: notDoneItems.length,
      items: notDoneItems.map((i) => i.content),
    },
  ]

  const COLORS = ['#0088FE', '#FF8042']

  return (
    <Container maxWidth="sm" sx={{ padding: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: 2 }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" align="center">
          {intl.formatMessage({ id: 'detail.title' })}
        </Typography>
        <Box width="48px" />
      </Box>

      <ShoppingListComponent
        shoppingList={shoppingList}
        changeShoppingList={changeShoppingList}
      />

      <Box m="auto" mb={8} maxWidth="sm" sx={{ maxHeight: 300 }}>
        <Paper sx={{ pr: 5, pl: 4 }}>
          <Typography variant="h6" sx={{ pt: 2 }}>
            {intl.formatMessage({ id: 'detail.solvedUnsolvedChart' })}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <UserShoppingListManagement
        shoppingList={shoppingList}
        changeShoppingList={changeShoppingList}
      />
    </Container>
  )
}
