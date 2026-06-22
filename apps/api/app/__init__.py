import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from .routes.chat import chat_bp
from .routes.health import health_bp


def create_app():
    load_dotenv()

    app = Flask(__name__)
    frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
    CORS(app, resources={r"/*": {"origins": frontend_origin}})

    app.register_blueprint(health_bp)
    app.register_blueprint(chat_bp)

    return app
