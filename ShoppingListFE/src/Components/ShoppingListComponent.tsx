import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { ShoppingList } from '../types/types'
import {
  Add,
  Delete,
  Edit,
  ArchiveOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material'

interface Props {
  shoppingList: ShoppingList
}

export const ShoppingListComponent = ({ shoppingList }: Props) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton>
            {!shoppingList.hide ? (
              <VisibilityOffOutlined />
            ) : (
              <VisibilityOutlined />
            )}
          </IconButton>

          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            {shoppingList.name}
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <ArchiveOutlined />
          </IconButton>
        </Box>
      </Box>

      <List>
        {['Položka 1', 'Položka 2', 'Položka 3'].map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              index === 1 ? (
                <IconButton>
                  <Delete />
                </IconButton>
              ) : null
            }
            sx={{ backgroundColor: index === 1 ? '#FFCCFF' : 'transparent' }}
          >
            <Checkbox edge="start" />
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        startIcon={<Add />}
        fullWidth
        sx={{ backgroundColor: '#FF66FF', color: 'white' }}
      >
        Přidat další položku
      </Button>
    </Paper>
  )
}
