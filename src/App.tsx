import './App.css'
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Router } from './Router'
import { Alerts } from './Components/Alerts'
import { IntlProvider } from 'react-intl'
import enMessages from './locales/en.json'
import csMessages from './locales/cs.json'
import { appStore } from './store/appStore'
import { useStore } from './store/useStore'

const messages = {
  en: enMessages,
  cs: csMessages,
}

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#E682E9' : '#BB86FC',
      light: mode === 'light' ? '#F895FC' : '#BB86FC',
    },
    secondary: {
      main: mode === 'light' ? '#F895FC' : '#1A1A1A',
    },
    background: {
      default: mode === 'light' ? '#f895fc' : '#0D0D0D',
      paper: mode === 'light' ? '#FFF' : '#1A1A1A',
    },
    text: {
      primary: mode === 'light' ? '#3C3C3C' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#B3B3B3',
    },
  },
})

function App() {
  const themeMode = useStore(appStore, 'themeMode')
  const language = useStore(appStore, 'language')

  const theme = createTheme(getThemeOptions(themeMode))

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <Alerts />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
