from flask import Blueprint, request, jsonify, current_app
import requests

submit_bp = Blueprint('submit', __name__)

@submit_bp.route('/api/submit', methods=['POST'])

def submit():
    data = request.json
    current_app.logger.info(data)
        
    mrn = data.get('mrn')
    fin = data.get('fin')
    hous_sec = data.get('housingSecurity')
    food_sec = data.get('foodSecurity')
    hous_con = data.get('housingCondition')
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
    
    formstack= 'https://www.formstack.com/api/v2/form/5780073/submission.json'
    
    # Send the data to the mock external system
    #responses = requests.post(f'http://{external_system_ip}/verify', json=data)


    # Construct payload for Formstack submission
    payload = {
        "field_166238471": mrn,      # Replace '12346' with the actual field ID for Food Security
        "field_166238472": fin,
        "field_166239670": food_sec,
        "field_166239604": hous_con,
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
    if response.status_code == 200:
        # Assuming the Formstack API responds with JSON containing submission information
        response_data = response.json()
        return jsonify(response_data), 200  # Return the response from Formstack
    else:
        return jsonify({"error": "Failed to submit data to Formstack"}), response.status_code
        # Perform verification logic using the new fields
        
        # Return a response based on the verification result
#        if verification_result:
#            return jsonify({'message': 'Data verified successfully', 'redirectTo': '/success'})
#        else:
#            return jsonify({'message': 'Data verification failed'}), 400
#    else:
        # Handle unsuccessful request to the mock external system
#        return jsonify({'message': 'Error communicating with mock external system'}), 500


#def verify_data(data, valid, mrn, fin):
#    if valid.lower() == "true":
#        if mrn is not None:
#            if fin is not None:
#               return True
#    return False

    