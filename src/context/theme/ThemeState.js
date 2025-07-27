import { useState } from "react";
import ThemeContext from "./themeContext";

const ThemeState = (props) => {
  const [theme, setTheme] = useState("dark");

  const handleLightTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.style.backgroundColor = "#fff";
    }
  };

  const handleDarkTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#212121";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, handleLightTheme, handleDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
