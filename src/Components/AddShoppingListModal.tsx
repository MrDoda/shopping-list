import React, { useState } from 'react'
import { Box, Button, TextField, Modal, Typography } from '@mui/material'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (name: string) => void
}

export const AddShoppingListModal: React.FC<Props> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name)
      setName('')
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 1,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Shopping List
        </Typography>
        <TextField
          label="List Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
