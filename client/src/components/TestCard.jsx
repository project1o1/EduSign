import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom';

function TestCard(props) {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/test/"+props.title);
    }
  return (
    <div className="card" onClick={handleClick}>
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
    </div>
  );
}

// Props validation
TestCard.propTypes = {
    image: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,
  };

export default TestCard;
