import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { formatDate } from '../utils/formatDate';
import { initialValues, fields, validationSchema } from '../resources/forms/verifyContent';
import NavigationControl from '../components/NavigationControl';
import ProgressBar from '../components/ProgressBar';
import { useTranslation } from 'react-i18next';


function VerifyVisit() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationToken, setVerificationToken] = useState(null);
    const [cspNonce, setCspNonce] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [attempts, setAttempts] = useState('3');
    const [addresses, setAddresses] = useState('3');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // setting t object for translation utility 
    const { t, i18n } = useTranslation();

    // Dynamic API URL by env
    const getApiUrl = process.env.REACT_APP_URL;
    

    //remove cached session_id if reload without being verified
    useEffect(() => {
        if (!isVerified) {
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
        const storedNonce = localStorage.getItem('storedNonce') || 'NaN';
        const apiUrl = `${getApiUrl}/api/verify`;
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId,  
                },
                body: JSON.stringify(formattedValues),
                credentials: 'include'
            });

            const data = await response.json();
            //console.log(data);

            if (response.ok && data.isVerified) {
                setIsVerified(true);
                setVerificationToken(data.verificationToken);
                localStorage.setItem('session_id', data.session_id);
                if (data.verify_nonce) {
                    console.log('Nonce received from Flask:', data.verify_nonce);
                    localStorage.setItem('verifyNonce', data.verify_nonce);
                    setCspNonce(data.verify_nonce);
                } else {
                    console.warn('No nonce received in the verify response');
                }
                setAddresses(data.addresses);
                
                // security headers
                const csp = response.headers.get('Content-Security-Policy');
                const xfo = response.headers.get('X-Frame-Options');
                console.log('Content-Security-Policy:', csp);
                console.log('X-Frame-Options:', xfo);

                if (!csp || !xfo) {
                    console.warn('Security headers are not set properly');
                }
            } else {
                setIsVerified(false);
                if (data.message === 'NO VISITS FOUND') {
                    //console.log('Remaining attempts:', data.tries);
                    setAttempts(data.tries);
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
        //console.log('Attempts remaining:', attempts);
    }, [attempts]);

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
            navigate('/validateusr', { 
                state: { 
                    isVerified: isVerified,
                    veriToken: verificationToken,
                    addresses: addresses,
                    verifyNonce: cspNonce
                }   
            });
            //console.log(addresses); 
            //console.log(verificationToken);
        }
    }, [isVerified, addresses, navigate, verificationToken, cspNonce]);
    
    console.log("V1.4.0")
    return (
        <NavigationControl redirectPath="/">
            <div>

                <h1 className="ml-4 font-bold" >{t('ptvalidtitle')}</h1>
                {error && <div className="error ml-4">{error}</div>}
                {attempts > 0 && attempts < 3 && <div className="tries ml-4 ">{t('validationattempts')} {attempts}</div>}
                <ReusableForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    fields={fields}
                    validationSchema={validationSchema}
                    SubmitButton={(props) => (
                        <SubmitButton {...props} text={t('buttontextverify')} />
                    )}
                    showSubmit={true}
                />
            </div>
        </NavigationControl>
    );
}

export default VerifyVisit;