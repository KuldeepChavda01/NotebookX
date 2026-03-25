import "./App.css";

import { useState } from "react";

import Navbar from "./layouts/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";

import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

import NoteState from "./context/note/NoteState";
import ThemeState from "./context/theme/ThemeState";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token"),
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
