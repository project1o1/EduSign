import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TestQuestion from "./TestQuestion";

const api = "http://localhost:3000";
function Test(props) {
  const [testData, setTestData] = useState([]);
  const [isVisibles, setIsVisibles] = useState([true, false]);
  const [testResults, setTestResults] = useState({});

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
            setTestResults = {setTestResults}
        />
      );
    }
    return testQuestions;
  };
  return <div>
    {renderTestQuestions()}
    <button onClick={() => {
      console.log(testResults)
    }}>Submit</button>  
    </div>;
}
Test.propTypes = {
  type: PropTypes.string.isRequired,
    webcamRef: PropTypes.object.isRequired,
};

export default Test;
