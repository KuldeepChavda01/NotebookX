import { useContext } from "react";

import ThemeContext from "../context/theme/themeContext";

const Alert = (props) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  return (
    props.alert && (
      <div
        className={`alert text-${theme === "light" ? "dark" : "light"} bg-${theme === "light" ? "primary" : "grey"
          } border-${theme === "light" ? "dark" : "primary"} `}
      >
        <strong>{props.alert.alertType}:</strong>
        {props.alert.alertMsg}
      </div>
    )
  );
};

export default Alert;
