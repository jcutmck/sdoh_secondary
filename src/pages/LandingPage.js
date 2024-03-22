import React, {useState, useEffect} from 'react';
import { SubmitButton } from '../components/Button';
import { TextField } from '@mui/material';


function VerifyVisit() {   
    const [currentPage, setCurrentPage] = useState('landingpage');
    const [isVerified, setIsVerified] = useState(false);

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [dob, setDob] = useState('');
    
    const handleClick = () => {
        console.log('Button clicked on Landing Page!');
        console.log('First Name:', fName);
        console.log('Last Name:', lName);
        console.log('Date of Birth:', dob);
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
