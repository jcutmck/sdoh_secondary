import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { initialValues, fields } from '../resources/forms/sdohContent';
import NavigationControl from '../components/NavigationControl';
//import ProgressBar from '../components/ProgressBar';
//import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';


function UtSdoh() {   
    // react & router functions
    const navigate = useNavigate();

    // setting t object for translation utility 
    const { t, i18n } = useTranslation();  
    //console.log(i18n);
    
    // form activity statuses
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);   

    // form conent control variables
    const [formValues, setFormValues] = useState({});

    // form section control variables
    const [userParticipation, setUserParticipation] = useState(null); // Store initial participation value 
    const [showForm, setShowForm] = useState(false);
    const [consentComplete, setConsentComplete] = useState(null); // Store form main content continue button
    const [presentConsent, setPresentConsent] = useState(null); // Store form main content continue button

    // Dynamic API URL Variable by Environment
    const getApiUrl = process.env.REACT_APP_URL;


    // After verify & validate user and visit -- Asks user to participate
    // Submit button for that answer calls this
    // If No value is submitted -- POST of NO to backend, user routed to end page
    // If Yes value is submitted -- Value stored, User routed to main form page ("setShowForm = true")
    const handleParticipateSubmit = (values) => {
        setUserParticipation(values.participation); // Store the participation value
        if (values.participation === 'I choose not to participate') {
            // User does not participate - submit with minimal data and navigate
            const sessionId = localStorage.getItem('session_id');
            setIsSubmitting(true);
            const apiUrl = `${getApiUrl}/api/submit`;

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': sessionId,
                },
                body: JSON.stringify({ participation: values.participation }), // Send only participation value
                credentials: 'include',
            })
            .then(response => { 
                // ... your response handling code ... 
                navigate('/successpage', { replace: true });
            })
            .catch(error => { 
                // ... your error handling code ... 
                navigate('/failedpage', { replace: true });
            });
        } else {
            // userParticipation choice = I Choose to Participate
            setFormValues({ ...formValues, participation: userParticipation }); 
            setShowForm(true);
        }
    };

    // Function called on Main form content & form consent sections of form page
    // 1st -- setFormValues will add any new "values" to "formValues" each tim handleSubmit is run
    // 2nd -- end state check, if consentComplete is true start JSON POST Request Submission process
    // Get session id from dom -> setIsSubmitting screen freeze -> set dynamic API URL ->
    // Combine formValues and participation answer into one value = allValues
    // 3rd -- if not end state yet, setShowForm = true
    // 
    const handleSubmit  = (values) => {
        setFormValues({ ...formValues, ...values, participation: userParticipation }); // Accumulate values from each stage
        
        if (consentComplete) {
            // If showing final questions, submit the data
            const sessionId = localStorage.getItem('session_id');
            setIsSubmitting(true);
            const apiUrl = `${getApiUrl}/api/submit`;
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
            // the .then, .catch below all handle/react to responses to the JSON fetch() request
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                 // Logging to check security headers only
                const csp = response.headers.get('Content-Security-Policy');
                const xfo = response.headers.get('X-Frame-Options');
                console.log('Content-Security-Policy:', csp);
                console.log('X-Frame-Options:', xfo);
    
                // You can add some logic here to handle cases where headers are missing
                if (!csp || !xfo) {
                    console.warn('Security headers are not set properly');
                    //  You might want to log this or handle it in some way
                }
                return response.json(); // Parse the response body as JSON           
            })
            .then((data) => {
                //console.log(data);
                console.log('formValues = ');
                console.log(formValues);
                console.log('values = ');
                console.log(values);
                //console.log('allValues = ',allValues);
                // Navigate to the success page
                navigate('/successpage', { replace: true });
            })
            .catch(error => {
                // Handle errors
                //console.error(error);
                navigate('/failedpage', { replace: true });
            });
       
        } else {
            // If not showing consent questions, move to consent questions page
            setConsentComplete(true);
             // Set consentComplete to true HERE
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


    return (
        <NavigationControl redirectPath="/">
            <div>
                <h1 className="ml-4 mb-2 font-bold" >{t('welcome1')}</h1>
                <h1 className="ml-4 mt-4 font-bold">{t('sdohformname')}</h1>
               
                {!showForm && ( // Show participation question first
                    <>
                        <div className="instructions"> 
                            <div className="h-4" /> {/* Blank row/space */}
                            <p className="ml-4 max-w-[60em] break-words">{t('introtext1')}</p>
                            <div className="h-4" /> {/* Another blank row/space */}
                            <p className="ml-4 max-w-[60em] break-words">{t('introtext2')}</p>
                            <div className="h-4" /> {/* Another blank row/space */}
                        </div>
                        <ReusableForm
                            initialValues={initialValues}
                            onSubmit={handleParticipateSubmit} // Use separate submit handler
                            fields={fields.filter(field => field.name === 'participation')}
                            SubmitButton={(props) => (
                                <SubmitButton {...props} className="mb-4" text="Next" />
                            )}
                            showSubmit={true} // Always show submit for participate section
                        />
                    </>
                )}
                
                {showForm && !consentComplete && (// userParticipation=Yes & Consent Not Complete show Main sdoh questions section
                    <ReusableForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        fields={fields.filter(field => 
                            field.name !== 'participation' && 
                            field.name !== 'requestHelp' && 
                            field.name !== 'sdohConsentProgram' && 
                            field.name !== 'sdohConsentHelp'
                        )}
                        SubmitButton={(props) => (
                            <SubmitButton {...props} className="mb-4" text="Next" />
                        )}
                        showSubmit={true} // Always show submit for the main form
                    />
                )}

                {consentComplete && ( // userParticipation=Yes & Consent Not Complete show Main form content
                    <ReusableForm
                        initialValues={initialValues}
                        currentValues={formValues}
                        onSubmit={handleSubmit}
                        fields={fields.filter(field => 
                            field.name === 'requestHelp' || 
                            field.name === 'sdohConsentProgram' || 
                            field.name === 'sdohConsentHelp'
                        )}
                        SubmitButton={(props) => (
                            <SubmitButton {...props} className="mb-4" text="SUBMIT" />
                        )}
                        showSubmit={true}
                    />
                )}
                
            </div>
        </NavigationControl>
    );
}

export default UtSdoh;