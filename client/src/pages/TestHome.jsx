import { useEffect, useState } from "react";
import TestCard from "../components/TestCard";
import PreviousTests from "../components/PreviousTests";
import { v4 as uuidv4 } from "uuid";
import "../styles/Test.css";

const api = "http://localhost:3000";

function TestHome() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(api + "/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data);
      });
  }, []);

  return (
    <div className="test-home-container">
      <h2>Previous Tests</h2>
      <div className="previous-tests-container">
        <PreviousTests />
      </div>
      <div>
        <h2>Take a Test</h2>
        <div className="test-cards-container">
          {types.map((type) => (
            <TestCard key={uuidv4()} image={type.image_url} title={type.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestHome;
