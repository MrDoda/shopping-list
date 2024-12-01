import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ShoppingList } from '../types/types'
import { useNavigate } from 'react-router-dom' // Import useNavigate

interface ShoppingListCardProps {
  list: ShoppingList
  onToggleItemDone: (listId: string, itemId: string) => void
  onDeleteList: (listId: string) => void
  isOwner: boolean
}

export const ShoppingListCard = ({
  list,
  onToggleItemDone,
  onDeleteList,
  isOwner,
}: ShoppingListCardProps) => {
  const navigate = useNavigate() // Initialize useNavigate

  const handleCardClick = () => {
    navigate(`/detail/${list.id}`) // Navigate to the detail page
  }

  return (
    <Card
      key={list.id}
      sx={{
        width: '100%',
        maxWidth: 180,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 1,
        border: list.archived ? '2px solid #ccc' : '2px solid transparent',
        opacity: list.archived ? 0.8 : 1,
        position: 'relative',
        cursor: 'pointer', // Indicate that the card is clickable
      }}
      onClick={handleCardClick} // Add onClick handler to the Card
    >
      <CardContent>
        <Tooltip title={list.name}>
          <Typography variant="h6" noWrap>
            {list.name}
          </Typography>
        </Tooltip>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          {list.items.slice(0, 2).map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={!!item.done}
                  onClick={(e) => e.stopPropagation()} // Prevent event propagation
                  onChange={() => onToggleItemDone(list.id, item.id)}
                  size="small"
                />
              }
              label={
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    textDecoration: item.done ? 'line-through' : 'none',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {item.content}
                </Typography>
              }
              sx={{ alignItems: 'center' }}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
          {list.items.length > 2 && (
            <Typography variant="body2" color="textSecondary">
              ...and more
            </Typography>
          )}
        </Box>
        {isOwner && (
          <IconButton
            sx={{ position: 'absolute', bottom: 8, right: 8 }}
            onClick={(e) => {
              e.stopPropagation()
              onDeleteList(list.id)
            }}
          >
            <DeleteIcon color="disabled" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  )
}
