import './App.css'
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Router } from './Router'
import { Alerts } from './Components/Alerts'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#E682E9',
      light: '#F895FC',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
}

const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <Alerts />
    </ThemeProvider>
  )
}

export default App
