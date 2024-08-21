import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { formatDate } from '../utils/formatDate';
import { initialValues, fields, validationSchema } from '../resources/forms/verifyContent';

function VerifyVisit() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationToken, setVerificationToken] = useState(null);
    const [isNew, setIsNew] = useState(true);
    const [attempts, setAttempts] = useState('3');
    const [addresses, setAddresses] = useState('3');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Determine base API URL dynamically
    const getApiUrl = process.env.REACT_APP_URL;
    
    //remove cached session_id if reload without being verified
    useEffect(() => {
        if (!isVerified) {
            // Clear session ID when the component mounts and isVerified is false
            localStorage.removeItem('session_id');
            setIsNew(true);
            setAttempts('3');
            //console.log('Session ID cleared');
        }
    }, [isVerified]);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const formattedValues = {
            ...values,
            dob: formatDate(values.dob),
            freshen: isNew
        };
        setIsSubmitting(true);
        setIsNew(false);
        const sessionId = localStorage.getItem('session_id') || 'NaN';
        const apiUrl = `${getApiUrl}/api/verify`;
        
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

            const data = await response.json();
            //console.log(data);

            if (response.ok && data.isVerified) {
                setIsVerified(true);
                setVerificationToken(data.verificationToken);
                localStorage.setItem('session_id', data.session_id);
                setAddresses(data.addresses); // Store addresses
                
                // Check for security headers
                const csp = response.headers.get('Content-Security-Policy');
                const xfo = response.headers.get('X-Frame-Options');
                console.log('Content-Security-Policy:', csp);
                console.log('X-Frame-Options:', xfo);

                // You can add some logic here to handle cases where headers are missing
                if (!csp || !xfo) {
                    console.warn('Security headers are not set properly');
                    //  You might want to log this or handle it in some way
                }
            } else {
                setIsVerified(false);
                if (data.message === 'NO VISITS FOUND') {
                    //console.log('Remaining attempts:', data.tries); // Debug log
                    setAttempts(data.tries); // Update attempts based on backend response
                    setError('Visit not found. Please try again.'); 
                } else {
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
                    }
                }
        } catch (error) {
            //console.error('Failed to fetch:', error);
            setError(error.message || 'Failed to submit validation information, please try again.');
            if (error.message.includes('Maximum tries exceeded')) {
                navigate('/validationfail', { replace: true });
            }
        } finally {
            setSubmitting(false);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        //console.log('Attempts remaining:', attempts); // Log the attempts to see if it's updating
    }, [attempts]); // Add useEffect to monitor changes to attempts

    useEffect(() => {
        window.addEventListener('load', () => {
            setIsLoading(false);
        });
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);

    useEffect(() => {
        if (isVerified && verificationToken && addresses.length > 0) {
            //console.log('Navigating to /validateusr');
            navigate('/validateusr', { 
                state: { 
                    isVerified: isVerified,
                    veriToken: verificationToken,
                    addresses: addresses 
                }   
            });
            //console.log(addresses); 
            //console.log(verificationToken);
        }
    }, [isVerified, addresses, navigate, verificationToken]);
    
    return (
        <div>
            <h1 className="ml-4">Patient Visit Validation</h1>
            {error && <div className="error ml-4">{error}</div>}
            {attempts > 0 && attempts < 3 && <div className="tries ml-4 ">Validation attempts remaining: {attempts}</div>}
            <ReusableForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                fields={fields}
                validationSchema={validationSchema}
                SubmitButton={(props) => (
                    <SubmitButton {...props} text="Verify Visit" />
                )}
            />
        </div>
    );
}

export default VerifyVisit;