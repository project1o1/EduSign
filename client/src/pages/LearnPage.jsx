// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/LearnPage.css"; // Import the CSS file for styling
// // import placeholderImage from "./placeholderImage.jpg"; // Import the placeholder image

// const SERVER_URL = "http://192.168.0.105:8000"; // Replace with your server URL
// const FRAMES_PER_SECOND = 5;

// const LearnPage = () => {
//   const { type, id } = useParams();
//   const webcamRef = useRef(null);
//   const [isSending, setIsSending] = useState(false);
//   const [error, setError] = useState(null);

//   const sendFramesToServer = async (frame) => {
//     const url = `${SERVER_URL}/frame`;
//     try {
//       const response = await axios.post(url, {
//         frameData: frame,
//         type: type,
//         id: id,
//       });
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Error sending frames to the server. Please try again.");
//     }
//   };

//   const captureFrames = () => {
//     setIsSending(true);
//     const intervalId = setInterval(() => {
//       const videoSrc = webcamRef.current.getScreenshot();
//       sendFramesToServer(videoSrc);
//     }, 1000 / FRAMES_PER_SECOND);

//     // Stop sending frames after 5 seconds
//     setTimeout(() => {
//       clearInterval(intervalId);
//       setIsSending(false);
//     }, 5000);
//   };

//   return (
//     <div className="learn-page-container">
//       <div className="learn-header">
//         <h1>Learn</h1>
//         <h2>{type}</h2>
//         <h2>{id}</h2>
//       </div>
//       <div className="instruction-container">
//         <p className="instruction-text">
//           Please position yourself properly in front of the webcam and mimic the sign corresponding to the displayed word. Click the "Start" button to capture and send the frames to the server for validation.
//         </p>
//         <p className="instruction-text">
//           Make sure the sign is clear and well-captured to ensure accurate validation results.
//         </p>
//       </div>
//       <div className="image-container">
//         <img src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="Placeholder" className="placeholder-image" />
//       </div>
//       <div className="webcam-container">
//         <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//       </div>
//       {error && <p className="error-message">{error}</p>}
//       <div className="button-container">
//         <button onClick={captureFrames} disabled={isSending} className="capture-button">
//           {isSending ? "Sending..." : "Start"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LearnPage;


import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/LearnPage.css"; // Import the CSS file for styling
// import placeholderImage from "./placeholderImage.jpg"; // Import the placeholder image

const SERVER_URL = "http://192.168.0.105:8000"; // Replace with your server URL
const FRAMES_PER_SECOND = 5;

const LearnPage = () => {
  const { type, id } = useParams();
  const webcamRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendFramesToServer = async (frame) => {
    const url = `${SERVER_URL}/frame`;
    try {
      const response = await axios.post(url, {
        frameData: frame,
        type: type,
        id: id,
      });
      console.log("Response:", response.data);
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
    }, 5000);
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
          {/* <img src={placeholderImage} alt="Placeholder" className="placeholder-image" /> */}
          <img src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="Placeholder" className="placeholder-image" />
        </div>
        <div className="webcam-container">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="button-container">
        <button onClick={captureFrames} disabled={isSending} className="capture-button">
          {isSending ? "Sending..." : "Start"}
        </button>
      </div>
    </div>
  );
};

export default LearnPage;
