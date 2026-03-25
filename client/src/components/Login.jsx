import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeContext from "../context/theme/themeContext";

const Login = (props) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Enter valid email ";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be atleast six characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationSuccess = validate();

    if (validationSuccess) {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      setLoading(false);

      if (json.success) {
        props.login(json.token);
        props.showAlert("Login successful", "Success");
        navigate("/");
      } else {
        props.showAlert(json.message, "Failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form bg-${theme === "light" ? "primary" : "secondary"}`}
      noValidate
    >
      <h1
        className={`form-heading text-${theme === "light" ? "dark" : "light"}`}
      >
        Login
      </h1>

      <h3 className={`form-line text-${theme === "light" ? "dark" : "light"}`}>
        Login to continue to NotebookX
      </h3>

      <label
        htmlFor="email"
        className={`text-${theme === "light" ? "dark" : "light"}`}
      >
        E-Mail
      </label>
      {errors.email && <small className="error-msg">{errors.email}</small>}
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleOnChange}
        value={credentials.email}
        className={`text-${theme === "light" ? "dark" : "light"} bg-${
          theme === "light" ? "light" : "grey"
        }`}
      />

      <label
        htmlFor="password"
        className={`text-${theme === "light" ? "dark" : "light"}`}
      >
        Password
      </label>
      {errors.password && (
        <small className="error-msg">{errors.password}</small>
      )}
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleOnChange}
        value={credentials.password}
        className={`text-${theme === "light" ? "dark" : "light"} bg-${
          theme === "light" ? "light" : "grey"
        }`}
      />

      <button
        type="submit"
        disabled={loading}
        className={`btn form-btn btn-${theme === "light" ? "primary" : "dark"}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <h3
        className={`form-redirect-line text-${theme === "light" ? "dark" : "light"}`}
      >
        Don't have an account?
        <Link
          className={`form-redirect form-redirect-${theme === "light" ? "dark" : "light"}`}
          to="/signup"
        >
          Sign Up
        </Link>
      </h3>
    </form>
  );
};

export default Login;
