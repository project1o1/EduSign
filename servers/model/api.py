from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2
import tempfile
import shutil
import json
import os

from predict import Predict

# types = ['Word', 'Letter']
# models = ['keypoint_classifier4.tflite', 'keypoint_classifier4.tflite']
models_path = 'model/keypoint_classifier/models'
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
        type_category = data["type"]
        # id = data["id"]
        base64img = base64img.replace("data:image/jpeg;base64,", "")
        binary_image_data = base64.b64decode(base64img)
        nparr = np.frombuffer(binary_image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        label_name = preds[types.index(type_category)].get_hand_gesture_label(image)
        # print(label_name)

        return jsonify({"message": "Frame received and processed successfully", "label": label_name})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/video", methods=["POST"])
def upload_video():
    try:
        data = request.files["video"]
        video_file = tempfile.NamedTemporaryFile(suffix=".webm", delete=False)
        video_file.write(data.read())
        video_file.close()

        video_capture = cv2.VideoCapture(video_file.name)
        labels = []
        type_category = request.args.get("type")
        while True:
            ret, frame = video_capture.read()
            if not ret:
                break

            label_name = preds[types.index(type_category)].get_hand_gesture_label(frame)
            if(label_name != ""):
                labels.append(label_name)

        type_label = request.args.get("name")
        print(type_label)
        matching_labels = [label for label in labels if label == type_label]
        percentage = (len(matching_labels) / len(labels)) * 100

        # return jsonify({"labels": labels, "percentage": percentage})
        return jsonify({"percentage":percentage})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    try:
        types = [i for i in os.listdir(models_path) if os.path.isdir(f'{models_path}/{i}')]
        models = [f'{models_path}/{t}/keypoint_classifier.tflite' for t in types]
        preds = [Predict(i) for i in models]
        app.run(debug=True, host='0.0.0.0', port=8000, ssl_context=("./ssl_keys/flask.crt", "./ssl_keys/flask.key"))
    except Exception as e:
        print(str(e))