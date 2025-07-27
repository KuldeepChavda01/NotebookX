import React, { useContext } from "react";
import ThemeContext from "../context/theme/themeContext";

const About = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <div className="container about-wrapper">
      <h1
        className={`about-heading about-heading-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        Overview
      </h1>
      <div
        className={`about-data-wrapper ${
          theme === "light" ? "shadow-dark" : "bg-secondary"
        }`}
      >
        <p className={`overview text-${theme === "light" ? "dark" : "light"}`}>
          NotebookX is a secure, user-friendly note-taking app built on the MERN
          stack.It allows users to create, edit, and manage personal notes with
          ease, ensuring data privacy and security through modern authentication
          and encryption methods.
        </p>
      </div>
      <h1
        className={`about-heading about-heading-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        Features
      </h1>
      <div
        className={`about-data-wrapper ${
          theme === "light" ? "shadow-dark" : "bg-secondary"
        }`}
      >
        <div className="feature-line">
          <strong
            className={`bg-${theme === "light" ? "primary" : "offwhite"}`}
          >
            Secure Login:
          </strong>
          <p
            className={`${
              theme === "light" ? "bg-primary-light" : "bg-grey"
            } text-${theme === "light" ? "dark" : "light"}`}
          >
            Protected with encrypted passwords and token-based access.
          </p>
        </div>
        <div className="feature-line">
          <strong
            className={`bg-${theme === "light" ? "primary" : "offwhite"}`}
          >
            CRUD Operations:
          </strong>
          <p
            className={`${
              theme === "light" ? "bg-primary-light" : "bg-grey"
            } text-${theme === "light" ? "dark" : "light"}`}
          >
            Easily add, update, and delete your notes anytime.
          </p>
        </div>
        <div className="feature-line">
          <strong
            className={`bg-${theme === "light" ? "primary" : "offwhite"}`}
          >
            Data Privacy:
          </strong>
          <p
            className={`${
              theme === "light" ? "bg-primary-light" : "bg-grey"
            } text-${theme === "light" ? "dark" : "light"}`}
          >
            Notes are user-specific and only accessible by the authenticated
            user.
          </p>
        </div>
        <div className="feature-line">
          <strong
            className={`bg-${theme === "light" ? "primary" : "offwhite"}`}
          >
            Responsive Design:
          </strong>
          <p
            className={`${
              theme === "light" ? "bg-primary-light" : "bg-grey"
            } text-${theme === "light" ? "dark" : "light"}`}
          >
            Use TheNotebook on any device, anywhere.
          </p>
        </div>
        <div className="feature-line">
          <strong
            className={`bg-${theme === "light" ? "primary" : "offwhite"}`}
          >
            Seamless User Experience:
          </strong>
          <p
            className={`${
              theme === "light" ? "bg-primary-light" : "bg-grey"
            } text-${theme === "light" ? "dark" : "light"}`}
          >
            Intuitive UI with smooth navigation and note management.
          </p>
        </div>
      </div>
      <h1
        className={`about-heading about-heading-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        Why Choose NotebookX?
      </h1>
      <div
        className={`about-data-wrapper ${
          theme === "light" ? "shadow-dark" : "bg-secondary"
        }`}
      >
        <p
          className={`${
            theme === "light" ? "bg-primary-light" : "bg-grey"
          } text-${theme === "light" ? "dark" : "light"}`}
          style={{ padding: "10px", marginBottom: "10px" }}
        >
          NotebookX is built with a focus on simplicity and security. Your notes
          are completely yours—private, encrypted, and protected by modern best
          practices. Whether you're taking notes for work, school, or daily
          life, NotebookX helps you stay organized without distractions.
        </p>
        <p
          className={`${
            theme === "light" ? "bg-primary-light" : "bg-grey"
          } text-${theme === "light" ? "dark" : "light"}`}
          style={{ padding: "10px", marginBottom: "10px" }}
        >
          NotebookX is a modern digital notebook designed to securely capture
          and manage your thoughts and tasks. With authentication handled via
          bcrypt and JWT, your data is always safe from unauthorized access.
        </p>
        <p
          className={`${
            theme === "light" ? "bg-primary-light" : "bg-grey"
          } text-${theme === "light" ? "dark" : "light"}`}
          style={{ padding: "10px" }}
        >
          Whether it's a quick reminder or a detailed plan, NotebookX makes it
          easy to stay on top of things - reliable, intuitive, and always
          accessible.
        </p>
      </div>
    </div>
  );
};

export default About;
