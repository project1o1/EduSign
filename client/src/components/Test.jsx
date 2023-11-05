import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TestQuestion from "./TestQuestion";
import ResultCard from "./ResultCard";

const api = "http://localhost:3000";
function Test(props) {
  const difficulty = props.difficulty;
  const [testData, setTestData] = useState([]);
  const [isVisibles, setIsVisibles] = useState([true, false]);
  const [testResults, setTestResults] = useState({});
  // const [isTestCompleted, setIsTestCompleted] = useState(false);
  const isTestCompleted = props.isTestCompleted;
  const setIsTestCompleted = props.setIsTestCompleted;
  // const webcamRef = props.webcamRef; 

  useEffect(() => {
    fetch(api + "/signs/" + props.type)
      .then((res) => res.json())
      .then((data) => {
        setTestData(data);
        console.log(data);
      });
  }, []);
  const renderTestQuestions = () => {
    var testQuestions = [];
    for (var i = 0; i < testData.length; i++) {
      testQuestions.push(
        <TestQuestion
          id={i}
          name={testData[i].name}
          isVisible={isVisibles[i]}
          isVisibles={isVisibles}
          setIsVisibles={setIsVisibles}
          webcamRef={props.webcamRef}
          setTestResults={setTestResults}
        />
      );
    }
    return testQuestions;
  };
  return (
    <div>
      {!isTestCompleted && <div>
        {renderTestQuestions()}
        <button
          onClick={() => {
            // console.log(testResults)
            setIsTestCompleted(true);

          }}
        >
          Submit
        </button>
      </div>}
      {isTestCompleted && <div>
          <ResultCard testResults={testResults} difficulty={difficulty}/>
        </div>
        }
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
