import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';

const FailedPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <NavigationControl redirectPath="/sdoh">
      <div>
        <h1>"Sorry! Your form submission failed, please try again."</h1>
        <SubmitButton className="ml-4" text="Return Home" onClick={handleHome} />
      </div>
    </NavigationControl>
  );
};

export default FailedPage;