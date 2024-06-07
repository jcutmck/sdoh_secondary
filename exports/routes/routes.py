from flask import Blueprint, request, jsonify, current_app
import requests
from utils.extensions import cache
import uuid  # Import the uuid module for generating session ID

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/api/verify', methods=['POST', 'OPTIONS', 'GET'])
def verify():
    if request.method == 'GET':
        return jsonify({'message': 'GET method not allowed for this endpoint'}), 405

    if request.method == 'OPTIONS':
     #handle preflight request
     return '', 204 # No Content for preflight requests

    if request.method == 'POST':
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type"}), 415
    
    data = request.json
    session_id = request.headers.get('Session-ID')

    current_app.logger.info(data)

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    date_of_birth = data.get('dob')

    # Log the extracted data
    current_app.logger.info(f"First Name: {first_name}")
    current_app.logger.info(f"Last Name: {last_name}")
    current_app.logger.info(f"Date of Birth: {date_of_birth}")

    corepoint = 'https://cptest-vip.utmck.edu:9443/dev/get_ids/'

    try:
        # Send the data to Corepoint
        response = requests.post(corepoint, json=data)

        # Check if the request was successful
        if response.status_code == 200:
            # Assuming the Corepoint system responds with JSON containing the new fields
            response_data = response.json()
            current_app.logger.info(f"Session data set: {response_data}")

            # Process the response data
            mrn = response_data['IDS'].get('MRN')
            fin = response_data['IDS'].get('FIN')
            valid = response_data['IDS'].get('VALID')

            if valid.lower() == "true":
                 current_app.logger.info(f"RESPONSE Received, Headers: {response.headers}")
                 session_id = str(uuid.uuid4())

                 # Store the validation dataset from the cache
                 validation_data = {
	            'IDF': fin, #response_data['IDS']['FIN'],
	            'IDM': mrn, #response_data['IDS']['MRN'],
	            #'FN': first_name,
	            #'LN': last_name,
	            #'BDT': date_of_birth,
	            'VLD': valid #response_data['IDS']['VALID']
	         }
                 cache.set(session_id, validation_data, timeout=1*3600) #store for 1 hour

	         # Log the cache contents
                 cached_data = cache.get(session_id)
                 current_app.logger.info(f"Cached Data: {cached_data}")

                 # Perform validation on response fields
                 current_app.logger.info(f"VALIDATING RESPONSE FIELDS:")
                 verification_result = verify_data(data, valid, mrn, valid)

                 # Return a response based on the verification result
                 if verification_result:
                   #return jsonify({'message': 'Data verified successfully', 'redirectTo': '/success'}
                   current_app.logger.info(f"VERIFICATION SUCCESSFUL...")
                   return jsonify({'message': 'Data processed successfully', 'session_id': session_id, 'redirectTo': '/success'}), 200
            
                 else:
                   return jsonify({'message': 'RESPONSEDATA INVALID. CHECK IDs.', 'session_id': session_id}), 400
            else:
                return jsonify({'message': 'NO VISITS FOUND'}), 400
        else:
            # Handle unsuccessful request to Corepoint
            current_app.logger.error(f'Error communicating with Corepoint: {response.status_code} {response.text}')
            return jsonify({'message': 'Error communicating with Corepoint'}), response.status_code

    except requests.RequestException as e:
        # Handle request exception
        current_app.logger.error(f'RequestException: {e}')
        return jsonify({'message': 'Error communicating with Corepoint'}), 500

def verify_data(data, valid, mrn, fin):
    if valid.lower() == "true":
        if mrn is not None:
            if fin is not None:
                return True
    return False
