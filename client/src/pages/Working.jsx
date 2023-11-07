const Working = () => {
  return (
    <div>
      <h1>How it Works??</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <div>
              <h2>Monitoring Your Signs</h2>
              <p>
                The first step in the process is to collect frames through your
                webcam. These frames are then sent to the server for processing.
                This is done using a combination of JavaScript and WebRTC (Web
                Real-Time Communication) technology, which allows for real-time
                communication between web browsers and servers.
              </p>
            </div>
            <img
              src="https://raw.githubusercontent.com/sameli74/Hand-Detection/master/examples/example2-detected.png"
              alt="monitoring"
              style={{scale: "0.5" }}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div style={{ flex: 1 }}>
          <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <img
              src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2023_04_Fingers-Distance-1.jpg"
              alt="recognizing"
              style={{ scale: "0.5" }}
            />
            <div>
              <h2>Recognizing Spatial Locations of Your Hands</h2>
              <p>
                The specific algorithm used for hand detection and tracking is
                called "Holistic Hand Tracking". This algorithm is trained to
                predict 21 key landmarks on the hand such as knuckles, joints, and
                palm center. It uses a combination of computer vision and machine
                learning techniques to accurately detect and track the position of
                your hands in real-time.
              </p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <div>
              <h2>Predicting Your Signs</h2>
              <p>
                Once the spatial coordinates of your hands have been detected and
                tracked, they are used to recognize signs using a Simple Neural
                Network. This neural network is trained on a dataset of sign
                language gestures and is able to accurately predict the sign being
                made based on the position of your hands. The predicted details
                are then sent back to the client for display.
              </p>
            </div>
            <img
              src="https://developers.google.com/static/mediapipe/images/solutions/examples/hand_gesture.png"
              alt="predicting"
              style={{ scale: "0.5" }}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  );
};

export default Working;
