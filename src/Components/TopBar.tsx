import { Box, Select, MenuItem, IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode, Logout } from '@mui/icons-material'
import { useStore } from '../store/useStore'
import { appStore } from '../store/appStore'
import { useIntl } from 'react-intl'

export const TopBar = () => {
  const language = useStore(appStore, 'language')
  const themeMode = useStore(appStore, 'themeMode')
  const isLogged = !!useStore(appStore, 'token')
  const intl = useIntl()

  const handleLanguageChange = (event: any) => {
    appStore.setState({ language: event.target.value })
  }

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    appStore.setState({ themeMode: newMode })
  }

  const handleLogout = () => {
    appStore.setState({ token: undefined, user: undefined })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 1,
        borderBottom: '1px solid #ccc',
      }}
    >
      <Select
        value={language}
        onChange={handleLanguageChange}
        size="small"
        sx={{ marginRight: 2 }}
      >
        <MenuItem value="en">🇬🇧 English</MenuItem>
        <MenuItem value="cs">🇨🇿 Čeština</MenuItem>
      </Select>

      <Tooltip
        title={intl.formatMessage({
          id: themeMode === 'light' ? 'topBar.darkMode' : 'topBar.lightMode',
        })}
      >
        <IconButton onClick={toggleThemeMode} sx={{ marginRight: 2 }}>
          {themeMode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>

      {isLogged && (
        <Tooltip title={intl.formatMessage({ id: 'topBar.logout' })}>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
