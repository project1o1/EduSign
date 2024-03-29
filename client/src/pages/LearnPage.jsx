import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import "../styles/LearnPage.css";
import LoadingScreen from "./Loading"; // Import the LoadingScreen component
import variables from "../config";
const SERVER_URL = variables.MODEL_URL;
const api = variables.API_URL;

const LearnPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [counter, setCounter] = useState(5);
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

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

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${api}/signs/${type}/${id}`);
        console.log(response.data.image_url);
        setImageUrl(response.data.image_url);
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Mark loading as complete even in case of an error
      }
    };
    fetchImage();
  }, []);

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
      const Upper = type.charAt(0).toUpperCase() + type.slice(1);
      const url = `${SERVER_URL}/video?name=${id}&type=${Upper}`;
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
    <button
      onClick={() => navigate(`/learn/${type}`)}
      className="next-lesson-button"
    >
      Next Lesson
    </button>
  );

  const startOrRelearnButton = () => {
    if (percentage !== null) {
      if (percentage < 80) {
        return "Relearn";
      } else {
        // return "Start";
        console.log(id, type);
        axios
          .get(`${api}/update_progress`, {
            params: {
              username: user.username,
              type: type,
              name: id,
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return "Start";
  };

  return (
    <div className="learn-page-container">
      <div className="learn-header">
        <h1 style={{margin:0}}>Learning {type}</h1>
        <h2 style={{margin:0}}>Lesson: {id}</h2>
      </div>

      {isLoading ? ( // Display loading screen while image URL is being fetched
        <LoadingScreen />
      ) : (
        <>
          <div className="content-container">
            <div className="media-container">
              <div className="image-container">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Placeholder"
                    className="placeholder-image"
                  />
                )}
              </div>
              <div className="webcam-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
              </div>
            </div>
          </div>
          <div className="instruction-container">
            <ul>
              <li className="instruction-text">
                Please position yourself properly in front of the webcam and mimic
                the sign corresponding to the displayed word. Click the "Start"
                button to capture and send the frames to the server for validation.
              </li>
              <li className="instruction-text">
                Make sure the sign is clear and well-captured to ensure accurate
                validation results.
              </li>
            </ul>
          </div>
          {error && <p className="error-message">{error}</p>}
          {isProcessing && <p>Processing...</p>}
          {isSending && <p>{counter}</p>}
          {percentage !== null && <p>Progress: {percentage}%</p>}
          <div className="button-container">
            <button
              onClick={captureVideo}
              disabled={isSending || isProcessing}
              className="capture-button"
            >
              {isSending ? "Sending..." : startOrRelearnButton()}
            </button>
            {nextLessonButton}
          </div>
        </>
      )}
    </div>
  );
};

export default LearnPage;
