import PropTypes from "prop-types";

function ResultCard(props) {
  const testResults = props.testResults;
  const difficulty = props.difficulty;
  const threshold_score = difficulty==0?70:difficulty==1?80:90;
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Results</h4>
        {
            Object.keys(testResults).map((key) => {
                return (
                <div key={key}>
                    <span className="card-title">{key}</span><span>&nbsp;&nbsp;  - &nbsp;&nbsp; </span>
                    <span className="card-text">{testResults[key]+"  "}{testResults[key]>=threshold_score?"Good":"Bad"}</span>
                </div>
                );
            })
        }
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  testResults: PropTypes.object.isRequired,
    difficulty: PropTypes.number.isRequired,
};

export default ResultCard;
