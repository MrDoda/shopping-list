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
  }, [shoppingList])

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
      {isOwner && (
        <>
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
                      user.id !== shoppingList.ownerId &&
                      !shoppingList.members.some(
                        (member) => member.id === user.id
                      )
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
                      setSelectedUserId(null)
                    }
                  }
                }}
                disabled={!selectedUserId}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  )
}
