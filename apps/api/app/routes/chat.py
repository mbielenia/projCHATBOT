from flask import Blueprint, jsonify, request

from ..claude import answer_message


chat_bp = Blueprint("chat", __name__)


@chat_bp.post("/chat")
def chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()
    history = data.get("history", [])

    if not message:
        return jsonify({"error": "Wiadomość nie może być pusta."}), 400

    if not isinstance(history, list):
        history = []

    try:
        reply = answer_message(message, history)
    except Exception as error:
        return jsonify({"error": str(error)}), 500

    return jsonify({"reply": reply})
