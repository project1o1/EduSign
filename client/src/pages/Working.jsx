import React from "react";

const Working = () => {
  return (
    <div>
      <h1>How it Works??</h1>
      <div>
        <h2>Monitoring Your Signs</h2>
        <div>
          <img src="" alt="monitoring" />
          <p>
            Collects the frames through your webcam. The captured frames are
            then sent to the server for processing.
          </p>
        </div>
      </div>
      <div>
        <h2>Recognizing Spatial Locations of Your Hands</h2>
        <div>
            <p>The specific algorithm is used for hand detection and tracking is called "Holistic Hand Tracking". Which is trained to predict 21 key landmarks on the hand such as knuckles, joints, and palm center.</p> 
            <img src="" alt="recognizing" />
        </div>
      </div>
      <div>
        <h2>Predicting Your Signs</h2>
        <div>
            <img src="" alt="predicting" />
            <p>Using Spatial Coordinates to recognize signs using a Simple Neural Network. Sending the predicted details back to the client.</p>
        </div>
      </div>
    </div>
  );
};

export default Working;
