import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation  } from 'react-router-dom'
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { FormField, InitialValues, initialValues, validationSchema } from '../resources/forms/validateContent';
import { string } from 'yup';
import NavigationControl from '../components/NavigationControl';


function ValidateUsr() {   

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);   
    const [addresses, setAddresses] = useState([]);
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure the state, providing default values in case state is undefined
    const {veriToken = ''} = location.state || {};
    // Determine base API URL dynamically
    const getApiUrl = process.env.REACT_APP_URL;

    useEffect(() => {
        if (location.state && location.state.addresses) {
            setAddresses(location.state.addresses);
            // Create fields dynamically based on addresses
            const addressFields = [
                new FormField(
                    'address',
                    'Select your address',
                    'radio',
                    location.state.addresses.map(address => ({ value: address, label: address })),
                    string().required('Please select an address')
                )
            ];
            setFields(addressFields);
            setIsLoading(false);
        } else {
            // Handle case where addresses are not provided
            navigate('/SdohForm'); // or wherever you want to redirect
        }
    }, [location, navigate]);



    const handleSubmit  = async (values) => {
        const sessionId = localStorage.getItem('session_id');
        //console.log('Session ID:', sessionId);
        //console.log('Token:', veriToken);
        setIsSubmitting(true);
        const apiUrl = `${getApiUrl}/api/validate`;
        //const apiUrl = `https://sdohtest.utmck.edu/api/validate`;
        
        //console.log('API URL:', apiUrl);
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId,    
                    'Verification-Token': veriToken, 
                },
                body: JSON.stringify(values),
                credentials: 'include',  // Ensure cookies are included in the request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check for isValidated, Validation_token, and matching session_id
            if (data.isValidated !== true || 
                !data.validationToken || 
                data.session_id !== sessionId) {
                    throw new Error('Validation failed or invalid session');
                }

            // Navigate to the success page
            navigate('/utform', { replace: true });    
        } catch(error) {
            console.error('Error:', error);
            navigate('/validationfail', { replace: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <NavigationControl redirectPath="/">
            <div>
                <h1>Please choose an address where you live or have lived:</h1>
                {!isLoading && addresses.length > 0 ? (
                <ReusableForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    fields={fields}
                    validationSchema={validationSchema}
                    SubmitButton={(props) => (
                        <SubmitButton {...props} text="SUBMIT" />
                    )}
                />
            ) : (
                    <p>Loading verification question...</p>
                )}
            </div>
        </NavigationControl>
    );
}

export default ValidateUsr;