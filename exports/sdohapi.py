import os
from flask import Flask, request, make_response
from routes.routes import verify_bp
from routes.fscommit import submit_bp
import ssl
import logging
from flask_cors import CORS
from datetime import timedelta
from utils.extensions import cache

# Define SSL certificate and key file paths
#ca.crt
CERT_FILE = "/home/jclutter/sdohapi/uhsvtdohdapp01.crt"
KEY_FILE = "/home/jclutter/sdohapi/ca.key"

# Create SSL context
context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)

#context.load_cert_chain('/home/strawboss/sdohapi_unzip/uhsvtdohdapp01.crt',  '/home/strawboss/sdohapi_unzip/ca.key')
context.load_cert_chain(CERT_FILE, KEY_FILE)

app = Flask(__name__)
app.secret_key = "devkey"

cache.init_app(app,config={
    'CACHE_TYPE': 'filesystem',
    'CACHE_DIR': '/home/jclutter/flask_sessions',
    'CACHE_DEFAULT_TIMEOUT': 1 * 3600  # 1 hours
})


# Enable CORS globally
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["https://uhsvtsdohdapp01.utmck.edu"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Session-ID"],
        "supports_credentials": True
    }
})


# Disable session cookies
app.config['SESSION_COOKIE_NAME'] = None

@app.before_request
def before_request():
    app.logger.info("Flask application started")

#INITIALIZE Blueprints for API Routes
app.register_blueprint(verify_bp) 
app.register_blueprint(submit_bp) 
#app.config['CORS_DEBUG'] = True  # Enable CORS debug mod

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('flask_cors')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


if __name__ == '__main__':
    app.run(host='uhsvtsdohdapp01.utmck.edu',ssl_context=context, debug=True)
#    app.run(host='0.0.0.0',ssl_context=context, debug=True)
# SWITCH TO 0.0.0.0 FOR TESTING ONLY
