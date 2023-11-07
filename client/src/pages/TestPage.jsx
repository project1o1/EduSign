import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Instructions from "../components/Instructions";
import Test from "../components/Test";
import Webcam from "react-webcam";
import LoadingScreen from "./Loading";
import "../styles/TestPage.css";

function TestPage() {
  const { type } = useParams();
  const [isReadyForTest, setIsReadyForTest] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const webcamRef = useRef(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="test-page-container">
      <div className="instructions-container">
        {!isReadyForTest ? (
          <Instructions
            setIsReadyForTest={setIsReadyForTest}
            setDifficulty={setDifficulty}
          />
        ) : (
          <div className="test-page-main">
            <div className="test-container">
              {!isTestCompleted && (
                <div>
                  <h1>Test</h1>
                  <div className="webcam-container">
                    <Webcam
                      className="webcam"
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                    />
                  </div>
                </div>
              )}
              <Test
                type={type}
                webcamRef={webcamRef}
                difficulty={difficulty}
                isTestCompleted={isTestCompleted}
                setIsTestCompleted={setIsTestCompleted}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPage;
