import { Box, Tooltip, IconButton } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { useIntl } from 'react-intl'

interface ArchiveToggleProps {
  showArchived: boolean
  setShowArchived: (value: boolean) => void
}

export const ArchiveToggle = ({
  showArchived,
  setShowArchived,
}: ArchiveToggleProps) => {
  const intl = useIntl()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Tooltip
        title={
          showArchived
            ? intl.formatMessage({ id: 'tooltip.showActive' })
            : intl.formatMessage({ id: 'tooltip.showArchived' })
        }
      >
        <IconButton
          color={showArchived ? 'primary' : 'default'}
          onClick={() => setShowArchived(!showArchived)}
        >
          {showArchived ? <ArchiveIcon /> : <UnarchiveIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
