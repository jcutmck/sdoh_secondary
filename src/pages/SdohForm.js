import React, {useState, useEffect} from 'react';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { initialValues, fields } from '../resources/forms/sdohContent';


function UtSdoh() {   

    const [isLoading, setIsLoading] = useState(true);   


    const handleSubmit  = (values) => {
        const sessionId = localStorage.getItem('session_id');
        console.log('Session ID:', sessionId);
        /*
        /// Format the date value before submission
        const formattedValues = {
            ...values,
            dob: formatDate(values.dob),
        };*/
    
        fetch('https://uhsvtsdohdapp01.utmck.edu:5000/api/submit', {
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
            response.json();
        })
         
        .then((data) => {
            console.log(data);
            console.log(values);

        })
        .catch(error => {
            // Handle errors
            console.error(error);
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
            <h1>Social Determinants of Health Form - v0.901</h1>
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