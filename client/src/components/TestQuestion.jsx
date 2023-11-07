import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../styles/LearnPage.css";
import "../styles/TestComponent.css";

const SERVER_URL = "http://localhost:8000"; // Replace with your server URL
function TestQuestion(props) {
  const name = props.name;
  const isVisible = props.isVisible;
  const id = props.id;
  // const type = props.type;
  // const isVisibles = props.isVisibles;
  const setIsVisibles = props.setIsVisibles;
  const { type } = useParams();
  const webcamRef = props.webcamRef; // Use the provided webcamRef prop
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const mainSetTestResults = props.setTestResults;
  const [thisLevelCompleted, setThisLevelCompleted] = useState(false);
  const [isResponseReceived, setIsResponseReceived] = useState(false);
  const setIsTestCompleted = props.setIsTestCompleted;

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

        setIsProcessing(true); // Set isProcessing to true when API call is made

        axios
          .post(`${SERVER_URL}/video?name=${name}&id=${id}&type=${type}`, formData)
          .then((response) => {
            // setTestResult(response.data.percentage);
            mainSetTestResults((prevTestResults) => {
              prevTestResults[name] = response.data.percentage;
              return prevTestResults;
            });
            console.log(response.data.percentage)
            setIsResponseReceived(true);
            setIsProcessing(false); // Set isProcessing to false when response is received
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
    if (isResponseReceived) {
      setIsVisibles((prevIsVisibles) => {
        const newIsVisibles = [...prevIsVisibles];
        newIsVisibles[id] = false;
        if(newIsVisibles.length === id + 1) {
          setIsTestCompleted(true);
        } else {
        newIsVisibles[id + 1] = true;
        }
        return newIsVisibles;
      });
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="learn-page-container">
          <div className="learn-header">
            <h3>Test Type : {type}</h3>
            <h3>Test Word : {name}</h3>
          </div>
          <div className="content-container">
            <div className="image-container">
            </div>
            {/* <div className="webcam-container">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </div> */}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button onClick={startRecording} disabled={isRecording || isProcessing} className="capture-button">
              {thisLevelCompleted && isResponseReceived ? "Retake" : isRecording ? "Recording..." : isProcessing ? "Processing..." : "Start Recording"}
            </button>
            {thisLevelCompleted && isResponseReceived && <button onClick={onNext} className="capture-button">
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
  setIsTestCompleted: PropTypes.func.isRequired,
  // type: PropTypes.string.isRequired,
};

export default TestQuestion;
