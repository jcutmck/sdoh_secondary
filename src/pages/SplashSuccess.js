  import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };
  
  return (
    <NavigationControl redirectPath="/">
      <div>
        <h1>Forms submitted successfully, thank you!</h1>
        <SubmitButton text="Return Home" onClick={handleHome} />
      </div>
    </NavigationControl>
  );
};

export default SuccessPage;