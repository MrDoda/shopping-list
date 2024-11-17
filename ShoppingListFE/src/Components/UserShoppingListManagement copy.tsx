import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { ShoppingList, User } from '../types/types'
import { Add, Delete, Search } from '@mui/icons-material'
import { useUsers } from '../hooks/useUsers'
import { useEffect, useState } from 'react'
import {
  addShoppingListMember,
  removeShoppingListMember,
} from '../utils/shoppingListUtils'
import { useStore } from '../store/useStore'
import { appStore } from '../store/appStore'
import { usePermissions } from '../hooks/usePermissions'

interface Props {
  shoppingList: ShoppingList
  changeShoppingList: (shoppingList: ShoppingList) => void
}

export const UserShoppingListManagement = ({
  shoppingList,
  changeShoppingList,
}: Props) => {
  const { getUsers } = useUsers()
  const [users, setUsers] = useState<Array<User>>()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const { isOwner, isMember } = usePermissions(shoppingList)
  const user = useStore(appStore, 'user')

  useEffect(() => {
    const loadUsers = async () => {
      const userArray = await getUsers()
      userArray && setUsers(userArray)
    }
    loadUsers()
  }, [getUsers])

  if (!users) return null

  const ownerUser = users.find((usr) => usr.id === shoppingList.ownerId)

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Správa uživatelů</Typography>
      <List>
        <ListItem>
          <ListItemText primary={`${ownerUser?.name} (Owner)`} />
        </ListItem>
        {shoppingList.members?.map((member) => (
          <ListItem key={member.id}>
            <ListItemText primary={member.name} />
            {(isOwner || member.id === user?.id) && (
              <IconButton
                onClick={() => {
                  removeShoppingListMember(
                    member.id,
                    shoppingList,
                    changeShoppingList
                  )
                }}
              >
                <Delete />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Search />
        </Grid>
        <Grid item xs>
          <Select
            variant="outlined"
            placeholder="Select user"
            fullWidth
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {users
              .filter(
                (user) =>
                  user.id !== shoppingList.ownerId && // Exclude the owner user
                  !shoppingList.members.some((member) => member.id === user.id) // Exclude already existing members
              )
              .map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ backgroundColor: '#FF66FF', color: 'white' }}
            onClick={() => {
              if (selectedUserId) {
                const selectedUser = users.find(
                  (user) => user.id === selectedUserId
                )
                if (selectedUser) {
                  addShoppingListMember(
                    selectedUser,
                    shoppingList,
                    changeShoppingList
                  )
                  setSelectedUserId(null) // Reset the selection
                }
              }
            }}
            disabled={!selectedUserId} // Disable button if no user is selected
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
