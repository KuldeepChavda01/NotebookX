import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ThemeContext from "../context/theme/themeContext";

const Signup = (props) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!credentials.username.trim()) {
      newErrors.username = "Username is required";
    }

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
      const { username, email, password } = credentials;

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        props.login(json.token);
        navigate("/");
        props.showAlert("Account created successfully", "Success");
      } else {
        props.showAlert(json.message, "Success");
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
        Sign Up
      </h1>

      <h3 className={`form-line text-${theme === "light" ? "dark" : "light"}`}>
        Create an account to use NotebookX
      </h3>

      <label
        htmlFor="username"
        name="username"
        className={`text-${theme === "light" ? "dark" : "light"}`}
      >
        Username
      </label>
      {errors.username && (
        <small className="error-msg">{errors.username}</small>
      )}
      <input
        type="text"
        id="username"
        name="username"
        onChange={onChange}
        value={credentials.username}
        className={`text-${theme === "light" ? "dark" : "light"} bg-${
          theme === "light" ? "light" : "grey"
        }`}
      />

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
        onChange={onChange}
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
        onChange={onChange}
        value={credentials.password}
        className={`text-${theme === "light" ? "dark" : "light"} bg-${
          theme === "light" ? "light" : "grey"
        }`}
      />

      <button
        type="submit"
        className={`btn form-btn btn-${theme === "light" ? "primary" : "dark"}`}
      >
        Sign Up
      </button>

      <h3
        className={`form-redirect-line text-${theme === "light" ? "dark" : "light"}`}
      >
        Already have an account?
        <Link
          className={`form-redirect form-redirect-${theme === "light" ? "dark" : "light"}`}
          to="/login"
        >
          Login
        </Link>
      </h3>
    </form>
  );
};

export default Signup;
