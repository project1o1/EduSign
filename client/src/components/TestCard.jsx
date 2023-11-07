import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/Test.css";

function TestCard(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/test/" + props.title);
  }

  return (
    <div className="test-card" onClick={handleClick}>
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
    </div>
  );
}

TestCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TestCard;
