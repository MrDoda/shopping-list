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
import { UserShoppingListManagement } from '../Components/UserShoppingListManagement copy'
import { useShoppingList } from '../hooks/useShoppingList'

export const Detail = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams()
  const { getShoppingListDetail, patchShoppingList } = useShoppingList()
  const navigate = useNavigate()
  const debounceTimer = useRef<any>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const shoppingList = await getShoppingListDetail(id)
      shoppingList && setShoppingList(shoppingList)
      setLoading(false)
    }
    load()
  }, [])

  const changeShoppingList = async (
    patchedShoppingList: Partial<ShoppingList>
  ) => {
    setShoppingList((shoppingListOriginal) => {
      if (!shoppingListOriginal) return null
      return {
        ...shoppingListOriginal,
        ...patchedShoppingList,
      }
    })

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

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
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!shoppingList) {
    return (
      <div>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        Whoops! Something went wrong.
      </div>
    )
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ backgroundColor: '#FFB3FF', padding: 2, borderRadius: 2 }}
    >
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
          Detail
        </Typography>
        <Box width="48px" />
      </Box>

      <ShoppingListComponent
        shoppingList={shoppingList}
        changeShoppingList={changeShoppingList}
      />

      <UserShoppingListManagement
        shoppingList={shoppingList}
        changeShoppingList={changeShoppingList}
      />
    </Container>
  )
}
