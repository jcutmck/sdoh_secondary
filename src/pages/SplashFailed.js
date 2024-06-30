import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const FailedPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
      <h1>"Sorry! Your form submission failed, please try again."</h1>
      <SubmitButton text="Return Home" onClick={handleHome} />
    </div>
  );
};

export default FailedPage;