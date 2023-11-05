import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/LearnPage.css";
function TestQuestion(props) {
  let tr = [];
  const name = props.name;
  const isVisible = props.isVisible;
  const id = props.id;
  const isVisibles = props.isVisibles;
  const setIsVisibles = props.setIsVisibles;
  const { type } = useParams();
  const webcamRef = props.webcamRef;
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const mainSetTestResults = props.setTestResults;
  const [testResults, setTestResults] = useState([]);

  const SERVER_URL = "http://192.168.0.106:8000"; // Replace with your server URL
  const FRAMES_PER_SECOND = 5;

  const sendFramesToServer = (frame) => {
    const url = `${SERVER_URL}/frame`;
    try {
      axios.post(url, {
        frameData: frame,
        type: type,
        id: id,
      }).then((res) => {
        tr.push(res.data.label);
        setTestResults(tr);
        console.log(tr);
      })
    } catch (error) {
      console.error("Error:", error);
      setError("Error sending frames to the server. Please try again.");
    }
  };
  

  const captureFrames = () => {
    setIsSending(true);
    const intervalId = setInterval(() => {
      const videoSrc = webcamRef.current.getScreenshot();
      sendFramesToServer(videoSrc);
    }, 1000 / FRAMES_PER_SECOND);

    // Stop sending frames after 5 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      setIsSending(false);
      console.log(testResults)
      mainSetTestResults((prevTestResults) => {
        let newTestResults = [...prevTestResults];
        newTestResults.push(tr);
        return newTestResults;
      });
    }, 5000);
  };

  const onNext = () => {
    setIsVisibles((prevIsVisibles) => {
      const newIsVisibles = [...prevIsVisibles];
      newIsVisibles[id] = false;
      newIsVisibles[id + 1] = true;
      return newIsVisibles;
    });
    // setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="learn-page-container">
          <div className="learn-header">
            <h2>{type}</h2>
          </div>
          <div className="content-container">
            <div className="image-container">
              <h2>{name}</h2>
              {/* <img
                src={image_url}
                alt="Placeholder"
                className="placeholder-image"
              /> */}
            </div>
            {/* <div className="webcam-container">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div> */}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button
              onClick={captureFrames}
              disabled={isSending}
              className="capture-button"
            >
              {isSending ? "Sending..." : "Start"}
            </button>
            <button onClick={onNext} className="capture-button">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
TestQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  isVisibles: PropTypes.array.isRequired,
  setIsVisibles: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  webcamRef: PropTypes.object.isRequired,
  setTestResults: PropTypes.func.isRequired,
};

export default TestQuestion;
