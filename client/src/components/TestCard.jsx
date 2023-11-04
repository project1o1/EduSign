import PropTypes from 'prop-types'; 
import { useHistory } from 'react-router-dom';

function TestCard(props) {
    const history = useHistory();
    function handleClick() {
        history.push("/test/"+props.title);
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
