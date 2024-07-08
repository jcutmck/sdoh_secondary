import os
from flask import Flask, request, make_response
from flask_cors import CORS
from routes.routes import verify_bp
from routes.fscommit import submit_bp
import ssl
import logging
from datetime import timedelta
from utils.extensions import cache
from config import load_environment, DevelopmentConfig, ProductionConfig

# Load environment variables
load_environment()

# Create Flask app instance
app = Flask(__name__)

#reload function
def reload_config():
    if os.getenv('FLASK_ENV') == 'production':
        app.config.from_object(ProductionConfig)
        print("PROD Config")
    else:
        app.config.from_object(DevelopmentConfig)
        print("DEV config")
    app.config['ENV_CERT_FILE'] = os.getenv('ENV_CERT_FILE')

# Reload configuration after loading environment variables
reload_config()

# Define SSL certificate and key file paths
#ca.crt
CERT_FILE = "/etc/pki/tls/certs/uhsvtsdohdapp01.crt" #app.config['ENV_CERT_FILE']
KEY_FILE = "/etc/pki/tls/private/uhsvtsdohdapp01.key" #app.config['ENV_KEY_FILE']

# Create SSL context
context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)

#context.load_cert_chain('/home/strawboss/sdohapi_unzip/uhsvtdohdapp01.crt',  '/home/strawboss/sdohapi_unzip/ca.key')
context.load_cert_chain(CERT_FILE, KEY_FILE)

#app.secret_key = "devkey"

cache.init_app(app,config={
    'CACHE_TYPE': 'filesystem',
    'CACHE_DIR': '/home/jclutter/flask_sessions',
    'CACHE_DEFAULT_TIMEOUT': 1 * 3600  # 1 hours
})


# Enable CORS globally
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": [
            "https://uhsvtsdohdapp01.utmck.edu",
            "https://sdohtest.utmck.edu"
        ],
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

@app.route('/api', methods=['OPTIONS'])
def api_root():
    origin = request.headers.get('Origin')
    if origin in ["https://uhsvtsdohdapp01.utmck.edu", "https://sdohtest.utmck.edu"]:
        response = make_response('', 204)
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE, PUT'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, session-id'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    else:
        return make_response('Forbidden', 403)

if __name__ == '__main__':
#    app.run(host='uhsvtsdohdapp01.utmck.edu',ssl_context=context, debug=True)
    app.run(host='0.0.0.0',ssl_context=context, debug=True)
# SWITCH TO 0.0.0.0 FOR TESTING ONLY