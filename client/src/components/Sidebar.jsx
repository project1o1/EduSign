import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const buttons = {
    Home: "/",
    Learn: "/learn",
    Test: "/test",
    "About Us": "/about",
    "How it Works": "/working",
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: "#F8F9FA",
        color: "#212529",
        fontFamily: "Arial, sans-serif",
        width: "200px",
        padding: "2rem",
        // position: "fixed",
        // top: "80px",
        // left: 0,
        height: "100vh",
        zIndex: 1,
      }}
    >
      <div className="sidebar-buttons" style={{ position: "fixed" }}>
        {Object.keys(buttons).map((button, index) => (
          <div
            key={index}
            className="sidebar-button"
            style={{
              fontSize: "1.333rem",
              padding: "1rem 0",
              cursor: "pointer",
            }}
            onClick={() => handleClick(buttons[button])}
          >
            {button}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
