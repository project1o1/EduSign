import PropTypes from "prop-types";
import { useState } from "react";

function Instructions(props) {
  const setIsReadyForTest = props.setIsReadyForTest;
  const setDifficulty = props.setDifficulty;
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);

  const handleEasyClick = () => {
    setDifficulty(0);
    setSelectedDifficulty(0);
  };

  const handleMediumClick = () => {
    setDifficulty(1);
    setSelectedDifficulty(1);
  };

  const handleHardClick = () => {
    setDifficulty(2);
    setSelectedDifficulty(2);
  };

  return (
    <div>
      <style>{`
        .instructions-container {
          text-align: left;
          font-family: Arial, sans-serif;
        }
        .difficulty-buttons {
          display: flex;
          gap: 10px;
          margin-left: 30px;
        }
        .difficulty-button {
          padding: 10px 20px;
          font-size: 18px;
          cursor: pointer;
          border: none;          
        }
        .difficulty-button.selected {
          background-color: #035e29;
          color: #fff;
        }
        .start-button {
          margin-top: 20px;
          padding: 15px 30px;
          font-size: 20px;
          cursor: pointer;
          background-color: #2ecc71;
          color: #fff;
          border: none;
        }
        .additional-instructions {
          font-size: 16px;
          margin-top: 20px;
          
        }
        h5 {
            margin: 10px;
        }
      `}</style>
      <div className="instructions-container">
        <h3>Instructions</h3>
        <div className="additional-instructions">
          <h5>1. Click on the button below to start the test.</h5>
          <h5>2. Select the difficulty level:</h5>
          <div className="difficulty-buttons">
            <button
              className={`difficulty-button ${
                selectedDifficulty === 0 ? "selected" : ""
              }`}
              onClick={handleEasyClick}
            >
              Easy
            </button>
            <button
              className={`difficulty-button ${
                selectedDifficulty === 1 ? "selected" : ""
              }`}
              onClick={handleMediumClick}
            >
              Medium
            </button>
            <button
              className={`difficulty-button ${
                selectedDifficulty === 2 ? "selected" : ""
              }`}
              onClick={handleHardClick}
            >
              Hard
            </button>
          </div>
          <h5>3. The duration of each video recorded is 5 seconds.</h5>
          <h5>4. You can retake the video for a question after trying once.</h5>
          <h5>5. After attempting all the questions, the submit button will appear.</h5>
          <button className="start-button" onClick={() => setIsReadyForTest(true)}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

Instructions.propTypes = {
  setIsReadyForTest: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
};

export default Instructions;
