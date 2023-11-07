import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ percentage, label }) => {
  const monochromaticStyles = {
    rotation: 0.25,
    strokeLinecap: "butt",
    textSize: "16px",
    pathTransitionDuration: 0.5,
    pathColor: "#212529",
    textColor: "#212529",
    trailColor: "#d6d6d6",
    backgroundColor: "#F8F9FA",
  };

  return (
    <div style={{ width: "200px", textAlign: "center", margin: "1rem" }}>
      <h2 style={{ color: "#212529", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
        {label}
      </h2>
      <div style={{ width: "150px", margin: "0 auto" }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={16}
          styles={buildStyles(monochromaticStyles)}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;
