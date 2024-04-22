import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/Button';
import { TextField } from '@mui/material';


function VerifyVisit() {   

    //const [currentPage, setCurrentPage] = useState('landingpage');
    //const [isVerified, setIsVerified] = useState(false);
    //const [failVerify, setFailVerify] = useState(false);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [dob, setDob] = useState('');
    
    const navigate = useNavigate();

    const handleClick = () => {
        const data = {
            firstName: fName,
            lastName: lName,
            dob: dob
        };

        // local pyenv version:  fetch('http://127.0.0.1:5000/api/verify', {
        //LOCAL TEST:  'Content-Type': 'application/json'
      
        // corepoint version:  fetch('https://cptest-vip.utmck.edu:9443/dev/', {
        //COREPOINT TEST:  'Content-Type': '*/*'
    
        fetch('http://127.0.0.1:5000/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Handle response to this from Flask backend, NOT THE FRONT-END!
            console.log(data);
            if (data.redirectTo === '/success') {
                navigate('/form'); // Redirect to the success page
            }
        })
        .catch(error => {
            // Handle errors
            console.error(error);
        });
    };


      
    return (
      <div>
        <h1>"This is the Landing Page"</h1>
        <p>Please enter the following details to verify your visit</p>
        <div className="py-1">
            <TextField id="visittype" label="First Name" variant="filled"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
             />
        </div> 
        <div className="py-1">
            <TextField id="lname" label="Last Name" variant="filled" 
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            />
        </div>
        <div className="py-1">
            <TextField id="dob" label="Date of Birth" variant="filled" type="Date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{
                        shrink: true,}}
            />
        </div> 
        <div>
            <SubmitButton text="Verify Visit" onClick={handleClick} />
        </div>

      </div>
  );
}

export default VerifyVisit;