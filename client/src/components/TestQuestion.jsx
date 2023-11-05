import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/LearnPage.css";

function TestQuestion(props) {
  const name = props.name;
  const isVisible = props.isVisible;
  const id = props.id;
  const isVisibles = props.isVisibles;
  const setIsVisibles = props.setIsVisibles;
  const { type } = useParams();
  const webcamRef = props.webcamRef; // Use the provided webcamRef prop
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mainSetTestResults = props.setTestResults;
  const [testResult, setTestResult] = useState(0);
  const SERVER_URL = "http://192.168.0.106:8000"; // Replace with your server URL
  const [thisLevelCompleted, setThisLevelCompleted] = useState(false);

  const startRecording = () => {
    if (webcamRef.current) {
      const mediaStream = webcamRef.current.stream;
      const mediaRecorder = new MediaRecorder(mediaStream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("video", blob);

        axios
          .post(`${SERVER_URL}/video?name=${name}&id=${id}`, formData)
          .then((response) => {
            setTestResult(response.data.percentage);
            mainSetTestResults((prevTestResults) => {
              prevTestResults[name] = response.data.percentage;
              return prevTestResults;
            });
            console.log(response.data.percentage)
          })
          .catch((error) => {
            setError("Error sending the video to the server. Please try again."+error);
          });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
        setThisLevelCompleted(true);
        
        
      }, 5000);
    } else {
      setError("Webcam not available.");
    }
  };

  const onNext = () => {
    setIsVisibles((prevIsVisibles) => {
      const newIsVisibles = [...prevIsVisibles];
      newIsVisibles[id] = false;
      newIsVisibles[id + 1] = true;
      return newIsVisibles;
    });
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
            </div>
            {/* <div className="webcam-container">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </div> */}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button onClick={startRecording} disabled={isRecording} className="capture-button">
              {thisLevelCompleted ? "Retry" : isRecording ? "Recording..." : "Start Recording"}
            </button>
            {thisLevelCompleted && <button onClick={onNext} className="capture-button">
              Next
            </button>}
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
