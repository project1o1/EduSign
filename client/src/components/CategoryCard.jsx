import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useUser} from "@clerk/clerk-react";

const api = "http://localhost:3000";
const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const {user} = useUser();
  // Initialize completed progress to 0 by default
  const [completedProgress, setCompletedProgress] = useState(0);
  const totalProgress = category.count;
  const progress = (completedProgress / totalProgress) * 100;
  // category = {id,type,image_url,count}
  const handleClick = () => {
    // Redirect to the learn page with the selected category
    const type = category.type.toLowerCase();
    navigate(`/learn/${type}`);
    console.log("Selected category:", category);
  };

  useEffect(() => {
    // Get the number of completed words for the category
    axios
      .get(`${api}/progress`, {
        params: { username: user.username, type: category.type },
      })
      .then((res) => {
        console.log("Completed words:", res.data);
        setCompletedProgress(res.data.length);
        // console.log("Completed progress:", completedProgress);
      });
  }, [category.id]);

  return (
    <div onClick={handleClick}>
      <p>{category.type}</p>
      <img
        src={category.image_url}
        alt={category.type}
        width={"100px"}
        height={"100px"}
      />
      <div
        style={{ width: "100%", height: "10px", backgroundColor: "lightgray" }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryCard;
