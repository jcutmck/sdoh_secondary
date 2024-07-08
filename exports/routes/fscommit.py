from flask import Blueprint, request, jsonify, current_app, session
from utils.extensions import cache
import requests

submit_bp = Blueprint('submit', __name__)

@submit_bp.route('/api/submit', methods=['POST', 'OPTIONS'])
def submit():
    if request.method == 'OPTIONS':
        # Handle preflight CORS requests
        return '', 204  # No Content for preflight requests

    if request.method == 'POST':
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type"}), 415


    current_app.logger.info("!!START of FSCOMMIT-SUBMIT ROUTE!!")
    data = request.json
    current_app.logger.info(data)
    session_id = request.headers.get('Session-ID')
    validation_data = cache.get(session_id)
    current_app.logger.info(f"FSCOMMIT -Session ID: {session_id}")
    current_app.logger.info(f"FSCOMMIT -Session data set: {session.get('validation_data')}")

#    if not validation_data:
#        return jsonify({"error": "No validation data found"}), 400

    fname = validation_data.get('FNM')
    lname = validation_data.get('LNM')
    dtbrt = validation_data.get('DOB')
    mrn = validation_data.get('IDM')
    fin = validation_data.get('IDF')
    hous_sec = data.get('housingSecurity')
    # Capture the housingCondition values as a list
    hous_con = data.get('housingCondition', [])
    #hous_con = data.get('housingCondition')
    food_sec = data.get('foodSecurity')
    food_acc = data.get('foodAccess')
    heal_acc = data.get('healthcareAccess')
    util_sec = data.get('utilitySecurity')
    care_acc = data.get('childcareAccess')
    occu_acc = data.get('occupationAccess')
    educ_sec = data.get('educationAccess')
    fina_sec = data.get('financialSecurity')
    phys_sec = data.get('physicalSecurity')
    emot_sec = data.get('emotionalSecurity')
    safe_sec = data.get('safetySecurity')
    well_sec = data.get('wellbeingSecurity')
    help_req = data.get('requestHelp')

    hous_con_str = "\n".join(hous_con)

    formstack= 'https://www.formstack.com/api/v2/form/5780073/submission.json'

    # Send the data to the mock external system
    #responses = requests.post(f'http://{external_system_ip}/verify', json=data)


 # Construct payload for Formstack submission
    payload = {
        "field_166238501": {
          "first": fname,
          "last": lname,
        },
        "field_166238471": mrn,      
        "field_166238472": fin,
        "field_166238529": dtbrt,
        "field_166238573": hous_sec,
        "field_166239604": hous_con_str, #hous_con,
        "field_166239670": food_sec,
        "field_166239685": food_acc,
        "field_166239714": heal_acc,
        "field_166239734": util_sec,
        "field_166239744": care_acc,
        "field_166239752": occu_acc,
        "field_166239754": educ_sec,
        "field_166239758": fina_sec,
        "field_166239858": phys_sec,
        "field_166239860": emot_sec,
        "field_166239867": safe_sec,
        "field_166239871": well_sec,
        "field_166239912": help_req,
        # Add more fields as needed
    }

# Retrieve the bearer token from a secure location
    bearer_token = "ccf1c3dd965d78588833343192c19514"  # Replace with actual token retrieval

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {bearer_token}"
    }

    # Send the data to FormStack
    response = requests.post(formstack, json=payload, headers=headers)


    # Check if the request was successful
    if response.status_code in {200,201}:
        # Assuming the Formstack API responds with JSON containing submission information
        response_data = response.json()
        return jsonify(response_data), 200  # Return the response from Formstack
    else:
        return jsonify({"error": "Failed to submit data to Formstack"}), response.status_code

# Additional test route for debugging purposes
#@submit_bp.route('/submit/test', methods=['GET'])
#def test_submit():
#    return "Submit endpoint is reachable!"