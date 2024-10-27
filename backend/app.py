from flask import Flask, jsonify, request
import db.db as db
import model.test as test
from PIL import Image
import numpy as np

import cv2

app = Flask(__name__)


@app.route("/")
def hello():
    return jsonify({"message": "Hello, Flask!"})


@app.route("/garbage-cans", methods=["GET", "POST"])
def garbage_cans():
    if request.method == "GET":
        return db.get_garbage_cans()
    elif request.method == "POST":
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        if "longitude" not in data or "latitude" not in data:
            return jsonify({"error": "JSON must have longitude and latitude keys"}), 400
        longitude, latitude = data["longitude"], data["latitude"]
        if not isinstance(longitude, float) or not isinstance(latitude, float):
            return jsonify({"error": "Longitude and latitude must be floats"}), 400
        db.insert_garbage_can(longitude, latitude)
        return jsonify({"message": "Garbage can inserted successfully"}), 201


@app.route("/characters", methods=["GET", "POST"])
def characters():
    if request.method == "GET":
        return db.get_characters()
    elif request.method == "POST":
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        if "user_id" not in data or "character_id" not in data:
            return (
                jsonify({"error": "JSON must have user_id and character_id keys"}),
                400,
            )
        user_id, character_id = data["user_id"], data["character_id"]
        if not isinstance(user_id, int) or not isinstance(character_id, int):
            return jsonify({"error": "user_id and character_id must be integers"}), 400
        db.insert_character(data["user_id"], data["character_id"])
        return jsonify({"message": "Character inserted successfully"}), 201


@app.route("/garbages", methods=["GET", "POST"])
def garbages():
    if request.method == "GET":
        return db.get_garbages()
    elif request.method == "POST":
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        if "user_id" not in data or "longitude" not in data or "latitude" not in data:
            return (
                jsonify({"error": "JSON must have user_id, longitude and latitude keys"}),
                400,
            )
        user_id, longitude, latitude = data["user_id"], data["longitude"], data["latitude"]
        if not isinstance(user_id, int) or not isinstance(longitude, float) or not isinstance(latitude, float):
            return jsonify({"error": "user_id must be integer, longitude and latitude must be floats"}), 400
        db.insert_garbage(data["user_id"], data["longitude"], data["latitude"])
        return jsonify({"message": "Garbage inserted successfully"}), 201


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if not request.data:
            return jsonify({"error": "Request must be an image"}), 400
        np_img = np.frombuffer(request.data, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        if img is None:
            return jsonify({"error": "Invalid image"}), 400
        img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        model = test.load_model(test.model_path, num_classes=12, device=test.device)
        predict_class = test.predict_image(img_pil, model, test.classes_list, test.device)
        is_garbage = predict_class != "non-garbage"
        return jsonify({"is_garbage": is_garbage, "class": predict_class}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
