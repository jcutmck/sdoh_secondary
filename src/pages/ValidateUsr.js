import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation  } from 'react-router-dom'
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { FormField, InitialValues, initialValues, validationSchema } from '../resources/forms/validateContent';
import { string } from 'yup';
import NavigationControl from '../components/NavigationControl';
import { useTranslation } from 'react-i18next';

function ValidateUsr() {   

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);   
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { t, i18n } = useTranslation();  


    // Destructure the state, providing default values in case state is undefined
    const {isVerified, veriToken, addresses, verifyNonce } = location.state || {};
    
    // Determine base API URL dynamically
    const getApiUrl = process.env.REACT_APP_URL;

    useEffect(() => {
        if (location.state && location.state.addresses) {
            //setAddresses(location.state.addresses);
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
            navigate('/SdohForm');
        }
    }, [location, navigate]);



    const handleSubmit  = async (values) => {
        const sessionId = localStorage.getItem('session_id');
        setIsSubmitting(true);
        const apiUrl = `${getApiUrl}/api/validate`;
        /*
        console.log('Headers being sent:', {
            'Content-Type': 'application/json',
            'Session-ID': sessionId,
            'Verification-Token': veriToken,
            'X-CSP-Nonce': verifyNonce,
          });*/
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId,    
                    'Verification-Token': veriToken, 
                    'X-CSP-Nonce': verifyNonce,
                },
                body: JSON.stringify(values),
                credentials: 'include',
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
                <h1 className="ml-4 font-bold">{t('verifyaddress')}</h1>
                {!isLoading && addresses.length > 0 ? (
                <ReusableForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    fields={fields}
                    validationSchema={validationSchema}
                    SubmitButton={(props) => (
                        <SubmitButton {...props} text={t('buttontextsubmit')} />
                    )}
                    showSubmit={true} 
                />
            ) : (
                    <p>Loading verification question...</p>
                )}
            </div>
        </NavigationControl>
    );
}

export default ValidateUsr;