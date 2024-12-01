import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface DeleteConfirmationProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Shopping List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this shopping list? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
