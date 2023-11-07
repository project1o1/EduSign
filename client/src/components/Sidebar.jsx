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
        // padding: "1.3rem",
        // position: "fixed",
        // top: "80px",
        // left: 0,
        // top: 0,
        minHeight: "100%",
        zIndex: 1,
        flexShrink: 0,
        borderRight: "1px solid #dee2e6",
      }}
    >
      <div className="sidebar-buttons" style={{ position: "fixed", backgroundColor: "#F8F9FA", height: "101vh", width: "200px", top:0, paddingTop: "100px", borderRight: "1px solid #dee2e6" }}>
        {Object.keys(buttons).map((button, index) => (
          <div
            key={index}
            className="sidebar-button"
            style={{
              fontSize: "1.333rem",
              padding: "1.3rem",
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
