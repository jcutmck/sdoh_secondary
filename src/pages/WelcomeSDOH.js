import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';

const SDOHWelcome = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/sdoh'); // Navigate to the home page
  };

  return (
    <NavigationControl redirectPath="/">
      <div>
        <h1>Welcome to The University of Tennessee Medical Center!</h1>
        <h4>Many living and working conditions affect a person's health. At The University of Tennessee Medical Center, we want to better understand our patients. What is it like where they live, where they work and where they play.</h4> 
        <h4>Knowing these environmental factors improves our care and our ability to help.</h4>
        <h3>Would you answer a few questions about your life?</h3>
        <SubmitButton text="Proceed" onClick={handleHome} />
      </div>
    </NavigationControl>
  );
};

export default SDOHWelcome;