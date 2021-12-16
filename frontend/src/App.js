import { ThemeProvider } from "@emotion/react";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import { createTheme } from "@mui/material/styles";
import { gefcoPalette } from "./pages/style/palette";

function App() {
  const loggedIn = false

  const theme = createTheme({palette: gefcoPalette})
  return (
    <ThemeProvider theme={theme}>
      {loggedIn ? <LoginPage/> : <MainPage/>}
    </ThemeProvider>
    
  );
}

export default App;
