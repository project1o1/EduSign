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
    <div className="sidebar">
      <h1>EduSign</h1>
      <div className="sidebar-buttons">
        {Object.keys(buttons).map((button, index) => (
          <div
            key={index}
            className="sidebar-button"
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
