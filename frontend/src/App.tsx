import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import "./style.css"

const App = () => {
  const loggedIn = false // this will be moved
  return (
    <div className="App">
      {loggedIn ? <LoginPage/> : <MainPage/>}

    </div>
  );
}

export default App;
