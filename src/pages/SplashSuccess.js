import { React, useState } from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';
import ProgressBar from '../components/ProgressBar';


const SuccessPage = () => {
  const navigate = useNavigate();

  const [isClosing, setIsClosing] = useState(false);

  /*const handleClose = () => {
    setIsClosing(true);

    // Attempt to close the window directly
    window.close();

    // If direct close fails (due to browser restrictions), try a workaround
    if (!isClosing) {
      // Open a blank popup and immediately close it - this sometimes triggers a browser prompt
      const popup = window.open('', '_self');
      if (popup) popup.close();
    }
  };/

  /*const handleHome = () => {
    navigate('/'); // Navigate to the home page
  };*/
  //  <SubmitButton className="ml-4" text="Return Home" onClick={handleHome} />
  // <SubmitButton className="ml-4" text="Close Window" onClick={handleClose} />
  return (
    <NavigationControl redirectPath="/">
      <div>
        <ProgressBar />
        <h1 className="ml-4 font-bold">Forms submitted successfully, thank you!</h1>
        <h1 className="ml-4 italic">You may now close this browser window.</h1>

        
      </div>
    </NavigationControl>
  );
};

export default SuccessPage;