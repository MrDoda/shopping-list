import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useIntl } from 'react-intl'

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
  const intl = useIntl()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ id: 'modal.deleteConfirmation.title' })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl.formatMessage({ id: 'modal.deleteConfirmation.message' })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {intl.formatMessage({ id: 'modal.deleteConfirmation.cancel' })}
        </Button>
        <Button onClick={onConfirm} color="error">
          {intl.formatMessage({ id: 'modal.deleteConfirmation.delete' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
