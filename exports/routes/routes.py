from flask import Blueprint, request, jsonify, current_app, make_response
import requests
from utils.extensions import cache
import uuid  # Import the uuid module for generating session ID
import time

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/api/verify', methods=['POST', 'OPTIONS', 'GET', 'HEAD'])
def verify():
    if request.method == 'GET':
        return jsonify({'message': 'GET method not allowed for this endpoint'}), 405

    if request.method == 'HEAD':
        current_app.logger.info("Received HEAD request")
        return '', 200

    if request.method == 'OPTIONS':
        origin = request.headers.get('Origin')
        if origin in ["https://uhsvtsdohdapp01.utmck.edu", "https://sdohtest.utmck.edu"]:
            response = make_response('', 204)  # No Content for preflight requests
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, session-id'
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response
        else:
            return make_response('Forbidden', 403)

    if request.method == 'POST':
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type"}), 415

        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        session_id = request.headers.get('Session-ID')
        if not session_id:
            return jsonify({"error": "Session ID missing in headers"}), 400

        freshen = data.get('freshen', False)  # Parse Freshen from request json

        current_app.logger.info(f"Session ID: {session_id}")
        current_app.logger.info(f"Request Data: {data}")

        first_name = data.get('firstName')
        last_name = data.get('lastName')
        date_of_birth = data.get('dob')

        if not all([first_name, last_name, date_of_birth]):
            return jsonify({"error": "Missing required fields"}), 400

        corepoint = 'https://cptest-vip.utmck.edu:9443/dev/get_ids/'

        try:
            response = requests.post(corepoint, json=data)

            if response.status_code == 200:
                response_data = response.json()
                current_app.logger.info(f"Session data set: {response_data}")

                mrn = response_data['IDS'].get('MRN')
                fin = response_data['IDS'].get('FIN')
                zip = response_data['IDS'].get('ZIP')
                address = response_data['IDS'].get('ADDRESS')
                valid = response_data['IDS'].get('VALID')

                if valid and valid.lower() == "true":
                    session_id = str(uuid.uuid4())

                    validation_data = {
                        'FNM': first_name,
                        'LNM': last_name,
                        'IDF': fin,
                        'IDM': mrn,
                        'DOB': date_of_birth,
                        'ZPC': zip,
                        'ADR': address,
                        'VLD': valid
                    }
                    cache.set(session_id, validation_data, timeout=1*3600)
                    cache.set(f'tries_{session_id}', 3, timeout=1*3600)

                    cached_data = cache.get(session_id)
                    current_app.logger.info(f"Cached Data: {cached_data}")

                    verification_result = verify_data(data, valid, mrn, fin)

                    if verification_result:
                        cache.delete(f'tries_{session_id}')  # Reset tries on successful verification
                        return jsonify({'message': 'Data processed successfully', 'session_id': session_id, 'redirectTo':'/success'}), 200 
                    else:
                        return jsonify({'message': 'RESPONSEDATA INVALID. CHECK IDs.', 'session_id': session_id}), 400

                else:
                    #need to change up this session_id because its pre-session id creation
                    tries_key = f'tries_{session_id}'
                    tries = cache.get(tries_key)
                    if tries is None:
                        tries = 3
                    elif freshen and tries is not None:
                        tries = 3
                        tries -= 1
                    else:
                        tries -= 1
                    cache.set(tries_key, tries, timeout=1*3600)

                    if tries > 0:
                        return jsonify({'message': 'NO VISITS FOUND', 'tries': tries}), 400
                    else:
                        cache.delete(tries_key)
                        return jsonify({'message': 'Maximum tries exceeded', 'redirectTo': '/failedpage'}), 400
            else:
                current_app.logger.error(f'Error communicating with Corepoint: {response.status_code} {response.text}')
                return jsonify({'message': 'Error communicating with Corepoint'}), response.status_code

        except requests.RequestException as e:
            current_app.logger.error(f'RequestException: {e}')
            return jsonify({'message': 'Error communicating with Corepoint'}), 500

def verify_data(data, valid, mrn, fin):
    if valid.lower() == "true":
        if mrn is not None and fin is not None:
            return True
    return False