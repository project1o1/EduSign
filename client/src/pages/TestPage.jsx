import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import Instructions from "../components/Instructions";
import Test from "../components/Test";
import Webcam from "react-webcam";

function TestPage() {
  const { type } = useParams();
  const [isReadyForTest, setIsReadyForTest] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const webcamRef = useRef(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  return (
    <div>
      <div>
        {!isReadyForTest && (
          <Instructions
            setIsReadyForTest={setIsReadyForTest}
            setDifficulty={setDifficulty}
          />
        )}
        {isReadyForTest && (
          <div>
            {!isTestCompleted && <div>
              <h1>Test</h1>
              <div className="webcam-container">
                <Webcam
                  style={{ height: "500px", width: "500px" }}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
              </div>
            </div>}
            <Test
              type={type}
              webcamRef={webcamRef}
              difficulty={difficulty}
              isTestCompleted={isTestCompleted}
              setIsTestCompleted={setIsTestCompleted}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPage;
