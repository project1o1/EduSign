import PropTypes from "prop-types";

function Instructions(props) {
    const setIsReadyForTest = props.setIsReadyForTest;
    const setDifficulty = props.setDifficulty;
    const handleEasyClick = () => setDifficulty(0);
    const handleMediumClick = () => setDifficulty(1);
    const handleHardClick = () => setDifficulty(2);
    return (
        <div>
            <h1>Instructions</h1>
            <h2>1. Click on the button below to start the test.</h2>
            <h3>Select the difficulty level</h3>
            <button onClick={handleEasyClick}>Easy</button>
            <button onClick={handleMediumClick}>Medium</button>
            <button onClick={handleHardClick}>Hard</button>

            <button onClick={() => setIsReadyForTest(true)}>Start Test</button>
        </div>
    );
}
Instructions.proptypes = {
  setIsReadyForTest: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
};

export default Instructions;
