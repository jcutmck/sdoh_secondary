  import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };
  
  return (
    <div>
      <h1>Forms submitted successfully, thank you!</h1>
      <SubmitButton text="Return Home" onClick={handleHome} />
    </div>
  );
};

export default SuccessPage;