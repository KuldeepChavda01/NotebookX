import React, { useContext, useState } from "react";
import ThemeContext from "../context/theme/themeContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const themeContext = useContext(ThemeContext);
  const { theme, handleLightTheme, handleDarkTheme } = themeContext;

  const navigate = useNavigate();

  const [navMenu, setNavMenu] = useState(false);
  const toggleNavbar = () => {
    if (!navMenu) {
      setNavMenu(true);
    } else {
      setNavMenu(false);
    }
  };

  const handleLogout = () => {
    props.logout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar nav-${theme} shadow-${
        theme === "light" ? "secondary" : "light"
      }`}
    >
      <h1 className={`logo text-${theme === "light" ? "dark" : "light"}`}>
        NotebookX
      </h1>
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        onClick={toggleNavbar}
      />
      <div className="hamburger-menu">
        <span
          className={`hamburger-line line1 bg-${
            theme === "light" ? "dark" : "light"
          }`}
        ></span>
        <span
          className={`hamburger-line line2 bg-${
            theme === "light" ? "dark" : "light"
          }`}
        ></span>
        <span
          className={`hamburger-line line3 bg-${
            theme === "light" ? "dark" : "light"
          }`}
        ></span>
      </div>
      <ul
        className={`nav-items ${!navMenu ? "" : "show-nav-items"} nav-items-${
          theme === "light" ? "light" : "dark"
        }`}
      >
        <li className="list-item">
          <Link
            className={`text-${theme === "light" ? "dark" : "light"}`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link
            className={`text-${theme === "light" ? "dark" : "light"}`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li className="list-item">
          <div className="mode-wrapper">
            <label htmlFor="mode" className="modes-label">
              Theme
            </label>
            <div
              className={`modes border-${theme === "light" ? "dark" : "light"}`}
              id="mode"
            >
              <div
                className={`light-mode-box active-mode-${
                  theme === "light" ? "light" : ""
                }`}
                onClick={() => {
                  handleLightTheme();
                }}
              >
                Light
              </div>
              <div
                className={`dark-mode-box active-mode-${
                  theme === "dark" ? "dark" : ""
                }`}
                onClick={() => {
                  handleDarkTheme();
                }}
              >
                Dark
              </div>
            </div>
          </div>
        </li>
        <li className="list-item">
          {props.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`btn btn-${
                theme === "light" ? "primary" : "secondary"
              }`}
            >
              Logout
            </button>
          ) : (
            <div className="btn-wrapper">
              <Link
                className={`btn btn-${
                  theme === "light" ? "primary" : "secondary"
                }`}
                style={{ marginRight: "10px" }}
                to="/login"
              >
                Login
              </Link>
              <Link
                className={`btn btn-${
                  theme === "light" ? "primary" : "secondary"
                }`}
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
