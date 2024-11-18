import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShoppingList } from '../hooks/useShoppingList'
import { ShoppingList } from '../types/types'
import { Container, Box, Typography, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ShoppingListComponent } from '../Components/ShoppingListComponent'
import { UserShoppingListManagement } from '../Components/UserShoppingListManagement copy'

export const Detail = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
  const { id } = useParams()
  const { getShoppingListDetail } = useShoppingList()
  const navigate = useNavigate()
  const { patchShoppingList } = useShoppingList()

  useEffect(() => {
    const load = async () => {
      const shoppingList = await getShoppingListDetail(id)
      shoppingList && setShoppingList(shoppingList)
    }
    load()
  }, [id])

  const changeShoppingList = (patchedShoppingList: Partial<ShoppingList>) => {
    setShoppingList((shoppingListOriginal) => {
      if (!shoppingListOriginal) return null
      return {
        ...shoppingListOriginal,
        ...patchedShoppingList,
      }
    })

    // patchShoppingList would be used to update on server
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
