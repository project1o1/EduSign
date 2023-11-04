import React from "react";
import { useParams } from "react-router-dom";
const LearnHome = () => {
  const { type } = useParams();
  return (
    <div>
      <h1>Learn</h1>
      <h2>{type}</h2>
    </div>
  );
};

export default LearnHome;
