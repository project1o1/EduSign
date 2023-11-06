import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
const api = "http://localhost:3000";

const LearnHome = () => {
  const { type } = useParams();
  const [words, setWords] = useState([]);
  const [completedStatus, setCompletedStatus] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${api}/signs/${type}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWords(data);
      });
  }, [type]);

  useEffect(() => {
    const updateCompletedStatus = async () => {
      const statusMap = {};
      for (const word of words) {
        try {
          const response = await axios.get(`${api}/completed`, {
            params: {
              username: user.username,
              type: type,
              name: word.name,
            },
          });
          statusMap[word.name] = response.data.completed;
        } catch (error) {
          console.log(error);
          statusMap[word.name] = false;
        }
      }
      setCompletedStatus(statusMap);
    };
    updateCompletedStatus();
  }, [words, type, user]);

  const handleClick = (word) => {
    console.log("Selected word:", word);
    navigate(`/learn/${type}/${word.name}`);
  };

  const wordList = words.map((word) => {
    return (
      <div key={word.id} onClick={() => handleClick(word)}>
        <p>{word.name}</p>
        {completedStatus[word.name] ? <p>Completed</p> : <p>Incomplete</p>}
      </div>
    );
  });

  const completedCount = Object.values(completedStatus).filter(
    (status) => status
  ).length;
  const totalCount = Object.values(completedStatus).length;
  const progress = (
    <div>
      <h2>Progress</h2>
      <p>
        {completedCount} / {totalCount}
      </p>
      <div
        style={{
          border: "1px solid #ccc",
          width: "100%",
          backgroundColor: "#f3f3f3",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "20px",
            width: `${(completedCount / totalCount) * 100}%`,
            backgroundColor: "#4caf50",
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Learn</h1>
      <h2>{type}</h2>
      {progress}
      {wordList}
    </div>
  );
};

export default LearnHome;
