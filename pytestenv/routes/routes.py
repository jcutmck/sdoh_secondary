from flask import Blueprint, request, jsonify, current_app

verify_bp = Blueprint('verify', __name__)

@verify_bp.route('/api/verify', methods=['POST','GET'])

def verify():
    data = request.json
    app.logger.info(data)
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    dob = data.get('dob')
    
    # Process the data as needed
    # For example, you could return a response with the processed data
    response_data = {
        'firstName': first_name,
        'lastName': last_name,
        'dob': dob
    }
    
    return jsonify(response_data)
    