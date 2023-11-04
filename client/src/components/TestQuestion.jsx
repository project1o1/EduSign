import PropTypes from "prop-types";

function TestQuestion(props) {
    const name = props.name;
    const image_url = props.image_url;
    const onNext = props.onNext;
    const isVisible = props.isVisible;
  return (
    <div>
        {isVisible && <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <img src={image_url} alt={name} />
            <button className="btn btn-primary" onClick={onNext}>Next</button>
          </div>
        </div>}
    </div>
  );
}
TestQuestion.propTypes = {
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };

export default TestQuestion;
