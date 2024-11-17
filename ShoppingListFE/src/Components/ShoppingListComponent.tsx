import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ShoppingList, ShoppingListItem } from '../types/types'
import {
  Add,
  Delete,
  Edit,
  ArchiveOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material'
import { usePermissions } from '../hooks/usePermissions'
import {
  updateShoppingList,
  updateShoppingListItem,
} from '../utils/shoppingListUtils'
import { useState } from 'react'

interface Props {
  shoppingList: ShoppingList
  changeShoppingList: (shoppingList: ShoppingList) => void
}

export const ShoppingListComponent = ({
  shoppingList,
  changeShoppingList,
}: Props) => {
  const [isEdit, setEdit] = useState<boolean>(false)
  const { isOwner, isMember } = usePermissions(shoppingList)

  const addNewItem = () => {
    const newItem: ShoppingListItem = {
      id: crypto.randomUUID(), // Generate a unique ID for the new item
      content: '',
      ownerId: shoppingList.ownerId,
      done: false,
    }

    updateShoppingList(
      'items',
      shoppingList,
      changeShoppingList
    )([...shoppingList.items, newItem]) // Append the new item to the items array
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() =>
              updateShoppingList(
                'hideComplete',
                shoppingList,
                changeShoppingList
              )(!shoppingList.hideComplete)
            }
          >
            {!shoppingList.hideComplete ? (
              <VisibilityOffOutlined />
            ) : (
              <VisibilityOutlined />
            )}
          </IconButton>

          {!isEdit ? (
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {shoppingList.name}
            </Typography>
          ) : (
            <TextField
              onChange={(e) =>
                updateShoppingList(
                  'name',
                  shoppingList,
                  changeShoppingList
                )(e.target.value)
              }
              value={shoppingList.name}
              fullWidth
            />
          )}
        </Box>
        <Box>
          {isOwner && (
            <IconButton onClick={() => setEdit(!isEdit)}>
              <Edit />
            </IconButton>
          )}
          {isOwner && (
            <IconButton
              onClick={() =>
                updateShoppingList(
                  'archived',
                  shoppingList,
                  changeShoppingList
                )(!shoppingList.archived)
              }
            >
              <ArchiveOutlined
                color={shoppingList.archived ? 'primary' : 'inherit'}
              />
            </IconButton>
          )}
        </Box>
      </Box>

      <List>
        {shoppingList.items.map((item, index) =>
          shoppingList.hideComplete && item.done ? null : (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  onClick={() => {
                    updateShoppingList(
                      'items',
                      shoppingList,
                      changeShoppingList
                    )(shoppingList.items.filter((_, i) => i !== index)) // Remove the item at the given index
                  }}
                >
                  <Delete />
                </IconButton>
              }
              value={item.id}
              sx={{ backgroundColor: index % 2 ? '#4b304c' : 'transparent' }}
            >
              <Checkbox
                edge="start"
                onChange={(e) => {
                  updateShoppingListItem(
                    item.id,
                    shoppingList,
                    changeShoppingList
                  )('done', e.target.checked)
                }}
                checked={!!item.done}
              />

              <ListItem>
                <TextField
                  fullWidth
                  value={item.content}
                  onChange={(e) =>
                    updateShoppingListItem(
                      item.id,
                      shoppingList,
                      changeShoppingList
                    )('content', e.target.value)
                  }
                />
              </ListItem>
            </ListItem>
          )
        )}
      </List>

      <Button
        variant="contained"
        startIcon={<Add />}
        fullWidth
        sx={{ backgroundColor: '#FF66FF', color: 'white' }}
        onClick={addNewItem}
      >
        Přidat další položku
      </Button>
    </Paper>
  )
}
