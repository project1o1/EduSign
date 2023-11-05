import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/LearnPage.css";

const SERVER_URL = "http://localhost:8000";

const LearnPage = () => {
  const { type, id } = useParams();
  const history = useHistory();
  const webcamRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    let timer;
    if (isSending) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSending]);

  const captureVideo = () => {
    setIsSending(true);
    const mediaStream = webcamRef.current.video.srcObject;
    const chunks = [];
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      sendVideoToServer(blob);
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      setIsSending(false);
      setIsProcessing(true);
    }, 5000);
  };

  const sendVideoToServer = async (video) => {
    try {
      const formData = new FormData();
      const url = `${SERVER_URL}/video?name=${id}`;
      formData.append("video", video);
      formData.append("type", type);
      formData.append("name", id);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      if (response.data && response.data.percentage !== undefined) {
        setPercentage(response.data.percentage);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error sending video to the server. Please try again.");
      setIsProcessing(false);
    }
  };

  const nextLessonButton = percentage >= 80 && (
    <button onClick={() => history.push(`/learn/${type}`)} className="next-lesson-button">
      Next Lesson
    </button>
  );

  const startOrRelearnButton = () => {
    if (percentage !== null) {
      if (percentage < 80) {
        return "Relearn";
      }
    }
    return "Start";
  };

  return (
    <div className="learn-page-container">
      <div className="learn-header">
        <h1>Learn</h1>
        <h2>{type}</h2>
        <h2>{id}</h2>
      </div>
      <div className="instruction-container">
        <p className="instruction-text">
          Please position yourself properly in front of the webcam and mimic the sign corresponding to the displayed word. Click the "Start" button to capture and send the frames to the server for validation.
        </p>
        <p className="instruction-text">
          Make sure the sign is clear and well-captured to ensure accurate validation results.
        </p>
      </div>
      <div className="content-container">
        <div className="image-container">
          <img src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="Placeholder" className="placeholder-image" />
        </div>
        <div className="webcam-container">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {isProcessing && <p>Processing...</p>}
      {isSending && <p>{counter}</p>}
      {percentage !== null && <p>Percentage: {percentage}</p>}
      <div className="button-container">
        <button onClick={captureVideo} disabled={isSending || isProcessing} className="capture-button">
          {isSending ? "Sending..." : startOrRelearnButton()}
        </button>
        {nextLessonButton}
      </div>
    </div>
  );
};

export default LearnPage;
