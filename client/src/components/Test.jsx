import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TestQuestion from "./TestQuestion";
import ResultCard from "./ResultCard";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "../styles/TestComponent.css";
import variables from "../config";
const api = variables.API_URL;
const test_questions_number = 5;
function Test(props) {
  const navigate = useNavigate();
  const difficulty = props.difficulty;
  const [testData, setTestData] = useState([]);
  const [isVisibles, setIsVisibles] = useState([true, false]);
  const [testResults, setTestResults] = useState({});
  // const [isTestCompleted, setIsTestCompleted] = useState(false);
  const isTestCompleted = props.isTestCompleted;
  const setIsTestCompleted = props.setIsTestCompleted;
  const [username, setUsername] = useState("");
  const [type, setType] = useState(props.type);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const webcamRef = props.webcamRef;

  useEffect(() => {
    fetch(api + "/test/" + props.type + "/" + test_questions_number)
      .then((res) => res.json())
      .then((data) => {
        setTestData(data);
        console.log(data);
      });
  }, []);

  const { user } = useUser();
  useEffect(() => {
    setUsername(user.username);
    setType(props.type);
  }, [user, props.type]);
  function saveTestResults() {
    axios
      .get(api + "/test_progress", {
        params: {
          username: username,
          difficulty: difficulty,
          test_date: new Date(),
          type: type,
          testResults: testResults,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSubmitted(true);
        // setIsTestCompleted(true);
      })
      .catch((err) => console.log(err));
  }

  const renderTestQuestions = () => {
    var testQuestions = [];
    for (var i = 0; i < testData.length; i++) {
      testQuestions.push(
        <TestQuestion
          key={uuidv4()}
          id={i}
          name={testData[i].name}
          isVisible={isVisibles[i]}
          isVisibles={isVisibles}
          setIsVisibles={setIsVisibles}
          webcamRef={props.webcamRef}
          setTestResults={setTestResults}
          setIsTestCompleted={setIsTestCompleted}
          // type = {type}
        />
      );
    }
    return testQuestions;
  };
  return (
    <div className="test-container">
      {!isTestCompleted && (
        <div className="test-questions-container">{renderTestQuestions()}</div>
      )}
      {isTestCompleted && !isSubmitted && (
        <div>
          <h3>All the questions are attempted </h3>
          <button
            className="submit-button"
            onClick={() => {
              setIsTestCompleted(true);
              saveTestResults();
            }}
          >
            Submit
          </button>
        </div>
      )}
      {isSubmitted && (
        <div>
          <h3>Test Submitted Successfully</h3>
          <ResultCard testResults={testResults} difficulty={difficulty} />
          <button
            className="submit-button"
            onClick={() => {
              setIsTestCompleted(false);
              setIsSubmitted(false);
              navigate("/test");
            }}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
Test.propTypes = {
  type: PropTypes.string.isRequired,
  webcamRef: PropTypes.object.isRequired,
  difficulty: PropTypes.number.isRequired,
  isTestCompleted: PropTypes.bool.isRequired,
  setIsTestCompleted: PropTypes.func.isRequired,
};

export default Test;