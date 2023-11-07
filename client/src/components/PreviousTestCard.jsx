import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

function PreviousTestCard (props) {
    const date = props.date;
    const previousTest = props.previousTest;
    return (
        <div className="previous-test" key={uuidv4()}>
            <h3>{date}</h3>
            <div className="previous-test-stats">
              <div className="previous-test-stat">
                <h4>Tests</h4>
                <p>{previousTest.tests}</p>
              </div>
              <div className="previous-test-stat">
                <h4>Accuracy</h4>
                <p>{previousTest.accuracy}%</p>
              </div>
              <div className="previous-test-stat">
                <h4>Type</h4>
                <p>{previousTest.type}</p>
              </div>
            </div>
          </div>
    )
}
PreviousTestCard.propTypes = {
    date: PropTypes.string.isRequired,
    previousTest: PropTypes.object.isRequired,
  };

export default PreviousTestCard;