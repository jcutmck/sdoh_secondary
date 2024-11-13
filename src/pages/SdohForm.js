import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { initialValues, fields } from '../resources/forms/sdohContent';
import NavigationControl from '../components/NavigationControl';
import { useTranslation } from 'react-i18next';


function UtSdoh() {   
    const navigate = useNavigate();

    // setting t object for translation utility 
    const { t, i18n } = useTranslation();  
    
    // form activity statuses
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);   

    // form conent control variables
    const [formValues, setFormValues] = useState({});

    // form section control variables
    const [userParticipation, setUserParticipation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [consentComplete, setConsentComplete] = useState(null); 
    const [presentConsent, setPresentConsent] = useState(null); 

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
                body: JSON.stringify({ participation: values.participation }),
                credentials: 'include',
            })
            .then(response => { 
                navigate('/successpage', { replace: true });
            })
            .catch(error => { 
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

    const handleSubmit  = (values) => {
        setFormValues({ ...formValues, ...values, participation: userParticipation }); // Accumulate values from each stage
        
        // update null values
        const finalValues = { ...values }; 
        
        for (const field of fields) {
            if (field.name !== 'sdohConsentHelp' &&  
                field.name !== 'sdohConsentProgram' &&
                finalValues[field.name] === undefined || finalValues[field.name] === '' || finalValues[field.name] === null)
            {
                finalValues[field.name] = 'I choose not to answer';
            }
            else if (field.name === 'housingCondition' && Array.isArray(finalValues[field.name]) && finalValues[field.name].length === 0)
            {
                finalValues[field.name] = ['I choose not to answer'];
            }
            else if (field.name === 'sdohConsentHelp' || field.name === 'sdohConsentProgram') 
                if (finalValues[field.name] === undefined || finalValues[field.name] === '' || finalValues[field.name] === null) 
                {
                  finalValues[field.name] = 'Does not apply';
                }
        }
        
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
                    'Session-ID': sessionId,
                },
                body: JSON.stringify(finalValues),
                credentials: 'include',
            })

            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();       
            })
            .then((data) => {
                //console.log(finalValues);
                navigate('/successpage', { replace: true });
            })
            .catch(error => {
                //console.error(error);
                navigate('/failedpage', { replace: true });
            });
       
        } else {
            // If not showing consent questions, move to consent questions page
            setConsentComplete(true);
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
                            <div className="h-4" />
                            <p className="ml-4 max-w-[60em] break-words">{t('introtext1')}</p>
                            <div className="h-4" />
                            <p className="ml-4 max-w-[60em] break-words">{t('introtext2')}</p>
                            <div className="h-4" />
                        </div>
                        <ReusableForm
                            initialValues={initialValues}
                            onSubmit={handleParticipateSubmit}
                            fields={fields.filter(field => field.name === 'participation')}
                            SubmitButton={(props) => (
                                <SubmitButton {...props} className="mb-4" text="Next" />
                            )}
                            showSubmit={true}
                        />
                    </>
                )}
                
                {showForm && !consentComplete && (
                // userParticipation=Yes & Consent Not Complete show Main sdoh questions section
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
                        showSubmit={true}
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
                            <SubmitButton {...props} className="mb-4" text={t('buttontextsubmit')} />
                        )}
                        showSubmit={true}
                    />
                )}
                
            </div>
        </NavigationControl>
    );
}

export default UtSdoh;