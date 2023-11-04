from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import base64
import numpy as np
import cv2
import tempfile
import shutil
import json

from predict import Predict
app = Flask(__name__)

# Initialize CORS with the app
CORS(app)

@app.route("/")
def root():
    return jsonify({"message": "Hello World"})

@app.route("/frame", methods=["POST"])
def upload_frame():
    try:
        data = request.get_json()
        base64img = data["frameData"]
        base64img = base64img.replace("data:image/jpeg;base64,", "")
        binary_image_data = base64.b64decode(base64img)
        nparr = np.frombuffer(binary_image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        label_name = pred.get_hand_gesture_label(image)
        # print(label_name)
        type = data["type"]
        id = data["id"]

        return jsonify({"message": "Frame received and processed successfully", "label": label_name, "type": type, "id": id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/video", methods=["POST"])
def upload_video():
    try:
        temp_dir = tempfile.TemporaryDirectory()
        temp_file_path = f"{temp_dir.name}/input_video.webm"

        with open(temp_file_path, "wb") as video_file:
            shutil.copyfileobj(request.files["file"], video_file)

        video_capture = cv2.VideoCapture(temp_file_path)
        frame_count = 0
        labels = []

        while True:
            ret, frame = video_capture.read()
            if not ret:
                break

            label_name = pred.get_hand_gesture_label(frame)
            labels.append(label_name)
            frame_count += 1
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    print(labels)
    return jsonify({"labels": json.dumps(labels)})

if __name__ == "__main__":
    pred = Predict()
    app.run(debug=True, host='192.168.0.105', port=8000)
