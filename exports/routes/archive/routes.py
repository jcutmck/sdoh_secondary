from flask import Blueprint, request, jsonify, current_app
import requests

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/api/verify', methods=['POST', 'GET'])
def verify():
    if request.method == 'GET':
        return jsonify({'message': 'GET method not allowed for this endpoint'}), 405

    data = request.json
    current_app.logger.info(data)

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    dob = data.get('dob')

    corepoint = 'https://cptest-vip.utmck.edu:9443/dev/get_ids/'

    try:
        # Send the data to Corepoint
        response = requests.post(corepoint, json=data)

        # Check if the request was successful
        if response.status_code == 200:
            # Assuming the Corepoint system responds with JSON containing the new fields
            response_data = response.json()

            # Process the response data
            mrn = response_data['IDS'].get('MRN')
            fin = response_data['IDS'].get('FIN')
            valid = response_data['IDS'].get('VALID')

            # Perform verification logic using the new fields
            verification_result = verify_data(data, valid, mrn, fin)

            # Return a response based on the verification result
            if verification_result:
                return jsonify({'message': 'Data verified successfully', 'redirectTo': '/success'})
            else:
                return jsonify({'message': 'Data verification failed'}), 400
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
