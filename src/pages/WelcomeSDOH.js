import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';

const SDOHWelcome = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <NavigationControl redirectPath="/">
      <div>
        <h1 className="ml-4 font-bold">Welcome to The University of Tennessee Medical Center!</h1> 
        <div className="h-4" />
        <p className="ml-4 max-w-[60em] break-words">Many living and working conditions affect a person's health.</p>
        <div className="h-4" />
        <p className="ml-4 max-w-[60em] break-words">At The University of Tennessee Medical Center, we want to better understand our patients.</p>
        <p className="ml-4 max-w-[80em] break-words">What is it like where they live, where they work and where they play. Knowing these environmental factors improves our care and our ability to help.</p>
        <div className="h-4" />
        <h3 className="ml-4">Would you answer a few questions about your life?</h3>
        <SubmitButton text="Proceed" onClick={handleHome} />
      </div>
    </NavigationControl>
  );
};

export default SDOHWelcome;