import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { formatDate } from '../utils/formatDate';
import { initialValues, fields } from '../resources/forms/verifyContent';

function VerifyVisit() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    //new useState values
    const [tries, setTries] = useState(3);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Determine base API URL dynamically
    const getApiUrl = () => {
        const { hostname } = window.location;
        if (hostname === 'sdohtest.utmck.edu') {
          return 'https://sdohtest.utmck.edu:5000';
        }
        return 'https://uhsvtsdohdapp01.utmck.edu:5000';
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const formattedValues = {
            ...values,
            dob: formatDate(values.dob),
        };

        const sessionId = localStorage.getItem('session_id') || 'NaN';
        const apiUrl = getApiUrl() + '/api/verify';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId  // Add this if you need to send Session-ID
                },
                body: JSON.stringify(formattedValues),
                credentials: 'include'  // Ensure cookies are included in the request
            });

            if (!response.ok) {
                //added new code here
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            
            if (data.message === 'NO VISITS FOUND') {
                setTries(data.tries);
                setError('No visits found. Please try again.');
            } else if (data.redirectTo === '/success') {
                localStorage.setItem('session_id', data.session_id);
                setIsVerified(true);
            } //used if you want to set a specific redirect, or redirect from flask backend
              //else if (data.redirectTo) {
              //  window.location.href = data.redirectTo;
            //}

        } catch (error) {
            console.error('Failed to fetch:', error);
            if (error.message === 'NO VISITS FOUND') {
                setError(error.message);
            } else if (error.message === 'Maximum tries exceeded. Redirecting.') {
                window.location.href = '/different_page';
            } else {
                setErrors({ submit: 'Failed to submit form, please try again.' });
            }
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
            <h1>Visit Validation Form - v0.811</h1>
            {error && <div className="error">{error}</div>}
            {tries > 0 && <div className="tries">Attempts remaining: {tries}</div>}
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