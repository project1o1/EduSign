import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const api = "http://localhost:3000";

const LearnHome = () => {
  const { type } = useParams();
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch(`${api}/signs/${type}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWords(data);
      });
  }, [type]);

  const wordList = words.map((word) => {
    return (
      <div key={word.id}>
        <p>{word.name}</p>
        {/* <img
          src={word.image_url}
          alt={word.name}
          width={"100px"}
          height={"100px"}
        /> */}
      </div>
    );
  });

  return (
    <div>
      <h1>Learn</h1>
      <h2>{type}</h2>
      {wordList}
    </div>
  );
};

export default LearnHome;
