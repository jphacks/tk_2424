from flask import Flask, jsonify, request, redirect, url_for
import db.db as db
import model.test as test
from PIL import Image
import numpy as np
import cv2
from dotenv import load_dotenv
import os
from oauthlib.oauth2 import WebApplicationClient
import requests
import yolo.yolo_predict as yolo_predict
import json
from flask_cors import CORS

load_dotenv()

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

app = Flask(__name__)

CORS(app)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"


# OAuth2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@app.route("/login")
def login():
    # Discover Google's authorization endpoint
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Prepare the request URI
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=GOOGLE_REDIRECT_URI,
        scope=[
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar.readonly",
            "https://www.googleapis.com/auth/spreadsheets.readonly",
            "https://www.googleapis.com/auth/documents.readonly",
            "https://www.googleapis.com/auth/presentations.readonly",
        ],
    )
    return redirect(request_uri)


@app.route("/google/callback")
def google_auth_callback():
    # 認証コードを取得
    code = request.args.get("code")

    # Googleプロバイダの設定を取得
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # トークンリクエストを準備して送信
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=GOOGLE_REDIRECT_URI,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # レスポンスのステータスコードを確認
    if token_response.status_code != 200:
        return "Error: Failed to fetch access token", 400

    # トークンレスポンスをJSONとして取得
    tokens = token_response.json()
    access_token = tokens.get("access_token")
    if not access_token:
        return "Error: Access token not found", 400

    # ユーザー情報を取得
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    headers = {"Authorization": f"Bearer {access_token}"}
    userinfo_response = requests.get(userinfo_endpoint, headers=headers)

    if userinfo_response.status_code != 200:
        return "Error: Failed to fetch user information", 400

    # ユーザー情報を返す
    user_info = userinfo_response.json()
    return jsonify(user_info)


@app.route("/")
def root():
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
                jsonify(
                    {"error": "JSON must have user_id, longitude and latitude keys"}
                ),
                400,
            )
        if "is_discarded" not in data:
            data["is_discarded"] = False
        user_id, longitude, latitude, is_discarded = (
            data["user_id"],
            data["longitude"],
            data["latitude"],
            data["is_discarded"],
        )
        if (
            not isinstance(user_id, int)
            or not isinstance(longitude, float)
            or not isinstance(latitude, float)
        ):
            return (
                jsonify(
                    {
                        "error": "user_id must be integer, longitude and latitude must be floats"
                    }
                ),
                400,
            )
        if (
            not isinstance(user_id, int)
            or not isinstance(longitude, float)
            or not isinstance(latitude, float)
        ):
            return (
                jsonify(
                    {
                        "error": "user_id must be integer, longitude and latitude must be floats"
                    }
                ),
                400,
            )
        db.insert_garbage(user_id, latitude, longitude, is_discarded)
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
        predict_class = test.predict_image(
            img_pil, model, test.classes_list, test.device
        )
        is_garbage = predict_class != "non-garbage"
        return jsonify({"is_garbage": is_garbage, "class": predict_class}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/yolo", methods=["GET", "POST"])
def yolo():
    try:
        if not request.data:
            return jsonify({"error": "Request must be an image"}), 400
        detections = yolo_predict.predict_objects(request.data)
        if len(detections) == 0:
            return jsonify({"type": "no"}), 200
        return jsonify({"detection": detections[0]["name"]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/status", methods=["GET"])
def status():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        if "level" not in data or "name" not in data:
            return jsonify({"error": "JSON must have level and name keys"}), 400
        level, name = data["level"], data["name"]
        if not isinstance(level, str) or not isinstance(name, str):
            return jsonify({"error": "level and name must be strings"}), 400
        with open("./data/status.json", "r") as f:
            status = json.load(f)
        hp = status[name][level]["hp"]
        attack = status[name][level]["attack"]
        return (
            jsonify({"hp": str(hp), "attack": str(attack)}),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081, debug=True)
