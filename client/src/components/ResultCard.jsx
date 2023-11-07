import PropTypes from "prop-types";
import "../styles/ResultCard.css";
function ResultCard(props) {
  const testResults = props.testResults;
  const difficulty = props.difficulty;
  const threshold_score = difficulty==0?70:difficulty==1?80:90;
  return (
    <div className="result-card">
      <div className="result-card-body">
        <h4 className="result-card-title">Results</h4>
        {Object.keys(testResults).map((key) => (
          <div key={key} className="result-item">
            <span className="result-item-title">{key}</span>
            <span>&nbsp;&nbsp; - &nbsp;&nbsp; </span>
            <span className={`result-item-text ${testResults[key] >= threshold_score ? "good-result" : "bad-result"}`}>
              {testResults[key]} {testResults[key] >= threshold_score ? "Good" : "Bad"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  testResults: PropTypes.object.isRequired,
    difficulty: PropTypes.number.isRequired,
};

export default ResultCard;
