from flask import Flask, jsonify, request
import db.db as db

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
        pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
