import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const api = "http://localhost:3000";
const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [completedProgress, setCompletedProgress] = useState(0);
  const totalProgress = category.count;
  const progress = (completedProgress / totalProgress) * 100;

  const handleClick = () => {
    const type = category.type.toLowerCase();
    navigate(`/learn/${type}`);
    console.log("Selected category:", category);
  };

  useEffect(() => {
    axios
      .get(`${api}/progress`, {
        params: { username: user.username, type: category.type },
      })
      .then((res) => {
        console.log("Completed words:", res.data);
        setCompletedProgress(res.data.length);
      });
  }, [category.id, user]);

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        padding: "20px",
        transition: "box-shadow 0.3s, transform 0.3s",
        boxShadow: "2px 2px 5px #a3a3a3",
        width: "240px",
        height: "350px",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "2px 2px 3px #a3a3a3";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "2px 2px 5px #a3a3a3";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <p style={{ color: "#212529", fontSize: "1.8rem" }}>{category.type}</p>
      <img
        src={category.image_url}
        alt={category.type}
        width={"180px"}
        height={"180px"}
        style={{ transition: "transform 0.3s" }}
      />
      <p style={{ color: "#212529", fontSize: "1.2rem", margin: "10px 0" }}>
        {completedProgress} / {totalProgress}
      </p>
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#f5f5f5",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#212529",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryCard;
