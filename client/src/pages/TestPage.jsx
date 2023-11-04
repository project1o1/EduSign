import { useParams } from "react-router-dom";
import { useState } from "react";
import Instructions from "../components/Instructions";

function TestPage() {
    const { type } = useParams();
    const [isReadyForTest, setIsReadyForTest] = useState(false);
    const [difficulty, setDifficulty] = useState(0);
  return (
    <div>
        {!isReadyForTest && <Instructions setIsReadyForTest={setIsReadyForTest} setDifficulty={setDifficulty}/> }
        {isReadyForTest && <div>
            <h1>Test</h1>
            <h2>{type}</h2>
            <h3>Difficulty: {difficulty}</h3>
        </div>}
    </div>
  );
}

export default TestPage;