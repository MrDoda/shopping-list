import { Card, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface AddShoppingListCardProps {
  onClick: () => void
}

export const AddShoppingListCard = ({ onClick }: AddShoppingListCardProps) => (
  <Card
    sx={{
      width: '100%',
      maxWidth: 180,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px dashed gray',
      cursor: 'pointer',
      margin: 1,
    }}
    onClick={onClick}
  >
    <IconButton size="large" color="primary">
      <AddIcon fontSize="large" />
    </IconButton>
  </Card>
)
