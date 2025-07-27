import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ThemeState from "./context/theme/ThemeState";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  // Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      alertMsg: msg,
      alertType: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const login = (authToken) => {
    localStorage.setItem("token", authToken);
    setIsLoggedIn(true);
  };
  const logout = (authToken) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <>
      <ThemeState>
        <NoteState>
          <BrowserRouter>
            <Navbar
              showAlert={showAlert}
              isLoggedIn={isLoggedIn}
              logout={logout}
            />
            <Alert alert={alert} />
            <Routes>
              <Route
                path="/"
                element={<Home showAlert={showAlert} isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/about"
                element={<About isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/login"
                element={<Login showAlert={showAlert} login={login} />}
              />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} login={login} />}
              />
            </Routes>
          </BrowserRouter>
        </NoteState>
      </ThemeState>
    </>
  );
}

export default App;
