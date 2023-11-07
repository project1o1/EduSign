import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import "../styles/Test.css";

function PreviousTestCard(props) {
  const date = props.date;
  const previousTest = props.previousTest;
  const dt = date.split("T");
  const time = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="previous-test" key={uuidv4()}>
      <div className="previous-test-stats">
        <div className="previous-test-stat">
          <h3>Questions</h3>
          <p>{previousTest.tests}</p>
        </div>
        <div className="previous-test-stat">
          <h3>Accuracy</h3>
          <p>{Math.round(previousTest.accuracy * 100) / 100}%</p>
        </div>
        <div className="previous-test-stat">
          <h3>Type</h3>
          <p>{previousTest.type}</p>
        </div>
      </div>
      <p>Date: {dt[0]}</p>
      <p>Time: {time}</p>
    </div>
  );
}

PreviousTestCard.propTypes = {
  date: PropTypes.string.isRequired,
  previousTest: PropTypes.object.isRequired,
};

export default PreviousTestCard;
