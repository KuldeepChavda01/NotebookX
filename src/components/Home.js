import React, { useContext } from "react";
import Notes from "./Notes";
import ThemeContext from "../context/theme/themeContext";

const Home = (props) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const { showAlert, isLoggedIn } = props;
  return (
    <div className="home">
      {!isLoggedIn ? (
        <div>
          <p
            className={`about-login-note text-${
              theme === "light" ? "dark" : "light"
            } border-${theme === "light" ? "dark" : "light"}`}
          >
            Please log in to your account to access NotebookX’s main features,
            including creating, editing, and managing your notes.
          </p>
        </div>
      ) : (
        <Notes showAlert={showAlert} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

export default Home;
