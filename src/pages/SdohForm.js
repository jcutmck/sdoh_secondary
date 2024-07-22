import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { initialValues, fields } from '../resources/forms/sdohContent';


function UtSdoh() {   

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);   
    const navigate = useNavigate();

    // Determine base API URL dynamically
    const getApiUrl = process.env.REACT_APP_URL; 

    const handleSubmit  = (values) => {
        const sessionId = localStorage.getItem('session_id');
        //console.log('Session ID:', sessionId);
        setIsSubmitting(true);
        const apiUrl = `${getApiUrl}/api/submit`;
        //const apiUrl = `https://sdohtest.utmck.edu/api/submit`;
        
        //console.log('API URL:', apiUrl);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Session-ID': sessionId, // Include the session ID in the headers
            },
            body: JSON.stringify(values),
            credentials: 'include',  // Ensure cookies are included in the request
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response body as JSON           
        })
        .then((data) => {
            //console.log(data);
            //console.log(values);
            // Navigate to the success page
            navigate('/successpage', { replace: true });
        })
        .catch(error => {
            // Handle errors
            //console.error(error);
            navigate('/failedpage', { replace: true });
        });
    };

    useEffect(() => {
        window.addEventListener('load', () => {
            setIsLoading(false);
        });
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);


    return (
        <div>
            <h1>Social Determinants of Health Form</h1>
            <ReusableForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                fields={fields}
                SubmitButton={(props) => (
                    <SubmitButton {...props} text="SUBMIT" />
                )}
            />
        </div>
    );
}

export default UtSdoh;