import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const notFoundStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  };

  const headingStyles = {
    fontSize: "5rem",
    color: "#ff7f50",
  };

  const textStyles = {
    fontSize: "1.5rem",
    color: "#343a40",
    marginBottom: "2rem",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "#343a40",
    padding: "0.5rem 1rem",
    border: "2px solid #343a40",
    borderRadius: "5px",
    transition: "all 0.3s",
  };

  return (
    <div style={notFoundStyles}>
      <h1 style={headingStyles}>404</h1>
      <p style={textStyles}>Oops! Page not found.</p>
      <p style={textStyles}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={linkStyles}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
