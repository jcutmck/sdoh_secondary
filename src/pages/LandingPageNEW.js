import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { formatDate } from '../utils/formatDate';
import { initialValues, fields } from '../resources/forms/verifyContent';

function VerifyVisit() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

/*    
    const initialValues = { firstName: '', lastName: '' };
    const fields = [
        { name: 'firstName', label: 'First Name', type: 'text'},
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'dob', label: 'Date of Birth', type: 'date' },
    ];
*/

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const formattedValues = {
            ...values,
            dob: formatDate(values.dob),
        };

        const sessionId = localStorage.getItem('session_id') || 'NaN';
        
        try {
            const response = await fetch('https://uhsvtsdohdapp01.utmck.edu:5000/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId  // Add this if you need to send Session-ID
                },
                body: JSON.stringify(formattedValues),
                credentials: 'include'  // Ensure cookies are included in the request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            if (data.redirectTo === '/success') {
                localStorage.setItem('session_id', data.session_id);
                setIsVerified(true);
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
            setErrors({ submit: 'Failed to submit form, please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        window.addEventListener('load', () => {
            setIsLoading(false);
        });
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);

    useEffect(() => {
        console.log('Verified Status: ', isVerified);
        if (isVerified) {
            navigate('/utform', { state: { isVerified } });
        }
    }, [isVerified, navigate]);

    return (
        <div>
            <h1>Visit Validation Form - v0.5</h1>
            <ReusableForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                fields={fields}
                SubmitButton={(props) => (
                    <SubmitButton {...props} text="Verify Visit" />
                )}
            />
        </div>
    );
}

export default VerifyVisit;