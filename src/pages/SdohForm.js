import React, {useState, useEffect} from 'react';
import { SubmitButton } from '../components/Button';
import ReusableForm from '../components/FormTemplate';
import { initialValues, fields } from '../resources/forms/sdohContent';
//import { useNavigate } from 'react-router-dom';
//import { TextField } from '@mui/material';
//import { formatDate } from '../utils/formatDate';

// TEST PATIENT IN M502:  MRN= 2952535   FIN= 29525350001

function UtSdoh() {   

    //const [currentPage, setCurrentPage] = useState('landingpage');
    const [isLoading, setIsLoading] = useState(true);
    //const navigate = useNavigate();
        
    const handleSubmit  = (values) => {
        /*
        /// Format the date value before submission
        const formattedValues = {
            ...values,
            dob: formatDate(values.dob),
        };*/

        fetch('https://uhsvtsdohdapp01.utmck.edu:5000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((response) => response.json())
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
            <h1>Social Determinants of Health Form - v0.29</h1>
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