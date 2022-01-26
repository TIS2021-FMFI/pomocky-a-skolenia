import { ThemeProvider } from '@emotion/react'
import LoginPage from './pages/login/LoginPage'
import MainPage from './pages/main/MainPage'
import { createTheme } from '@mui/material/styles'
import { gefcoPalette } from './pages/style/palette'
import { useSelector } from 'react-redux'
import './style.css'

function App() {
  const loggedIn = useSelector((state) => state.loggin.loggedIn)

  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: '#00538B',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: '#FFFFFF',
          },
        },
      },
    },
    palette: gefcoPalette,
  })
  return (
    <ThemeProvider theme={theme}>
      {loggedIn ? <MainPage /> : <LoginPage />}
    </ThemeProvider>
  )
}

export default App
