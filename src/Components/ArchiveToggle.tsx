import { Box, Tooltip, IconButton } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

interface ArchiveToggleProps {
  showArchived: boolean
  setShowArchived: (value: boolean) => void
}

export const ArchiveToggle = ({
  showArchived,
  setShowArchived,
}: ArchiveToggleProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
    <Tooltip
      title={showArchived ? 'Show only Active' : 'Show Archived as well'}
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
