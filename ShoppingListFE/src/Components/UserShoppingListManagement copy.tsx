import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ShoppingList } from '../types/types'
import { Add, Delete, Search } from '@mui/icons-material'

interface Props {
  shoppingList: ShoppingList
}

export const UserShoppingListManagement = ({ shoppingList }: Props) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Správa uživatelů</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Uživatel 1 (Owner)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Uživatel 2" />
          <IconButton>
            <Delete />
          </IconButton>
        </ListItem>
      </List>

      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Search />
        </Grid>
        <Grid item xs>
          <TextField variant="outlined" placeholder="username" fullWidth />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ backgroundColor: '#FF66FF', color: 'white' }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
