import os
from flask import Flask
from routes.routes import verify_bp

try:
    from flask_cors import CORS
except ImportError:
    CORS = None

app = Flask(__name__)
app.register_blueprint(verify_bp)

if CORS:
    CORS(app)

if __name__ == '__main__':
    app.run()