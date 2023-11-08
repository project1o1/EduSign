import { useEffect, useState } from "react";
import TestCard from "../components/TestCard";
import PreviousTests from "../components/PreviousTests";
import LoadingScreen from "./Loading";
import { v4 as uuidv4 } from "uuid";
import "../styles/Test.css";
import variables from "../config";

const api = variables.API_URL;

function TestHome() {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    fetch(api + "/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data);
        setIsLoading(false); // Set loading to false when data is fetched
      });
  }, []);

  // Conditional rendering of loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="test-home-container">
      <div>
        <h2>Take a Test</h2>
        <div className="test-cards-container">
          {types.map((type) => (
            <TestCard key={uuidv4()} image={type.image_url} title={type.type} />
          ))}
        </div>
      </div>
      <h2>Previous Tests</h2>
      <div className="previous-tests-container">
        <PreviousTests />
      </div>
    </div>
  );
}

export default TestHome;
