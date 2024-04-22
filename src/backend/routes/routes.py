from flask import Blueprint, request, jsonify, current_app
import requests

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/api/verify', methods=['POST','GET'])

def verify():
    data = request.json
    current_app.logger.info(data)
        
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    dob = data.get('dob')

    # Assuming the mock external system is running on localhost:5001
    #external_system_ip for testing on local machine only
    #external_system_ip = '127.0.0.1:5001'
    
    corepoint= 'https://cptest-vip.utmck.edu:9443/dev/get_ids/'
    
    # Send the data to the mock external system
    #responses = requests.post(f'http://{external_system_ip}/verify', json=data)

    # Send the data to Corepoint
    responses = requests.post({corepoint}, json=data)


    # Check if the request was successful
    if responses.status_code == 200:
        # Assuming the mock external system responds with JSON containing the new fields
        response_data = responses.json()

    # Process the response data
        mrn = response_data.IDS.get('MRN')
        fin = response_data.IDS.get('FIN')
        valid = response_data.IDS.get('VALID')

        # Perform verification logic using the new fields
        verification_result = verify_data(data, valid, mrn, fin)
        
        # Return a response based on the verification result
        if verification_result:
            return jsonify({'message': 'Data verified successfully', 'redirectTo': '/success'})
        else:
            return jsonify({'message': 'Data verification failed'}), 400
    else:
        # Handle unsuccessful request to the mock external system
        return jsonify({'message': 'Error communicating with mock external system'}), 500


def verify_data(data, valid, mrn, fin):
    if valid.lower() == "true":
        if mrn is not None:
            if fin is not None:
                return True
    return False
    

    