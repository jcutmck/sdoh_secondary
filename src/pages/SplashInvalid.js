import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const InvalidPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
      <h1>You have reached the maximum validation attempts. Please speak with a UT Medical Center team member to validate your visit information.</h1>
      <SubmitButton text="Return Home" onClick={handleHome} />
    </div>
  );
};

export default InvalidPage;