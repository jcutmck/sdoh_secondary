import React from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';

const InvalidPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <NavigationControl redirectPath="/">
      <div>
        <h1>You have reached the maximum validation attempts. Please speak with a UT Medical Center team member to validate your visit information or try again.</h1>
        <SubmitButton className="ml-4" text="Return Home" onClick={handleHome} />
      </div>
    </NavigationControl>
  );
};

export default InvalidPage;