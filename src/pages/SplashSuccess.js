import { React, useState } from 'react';
import { SubmitButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavigationControl from '../components/NavigationControl';
import { useTranslation } from 'react-i18next';


const SuccessPage = () => {
  const navigate = useNavigate();

  const [isClosing, setIsClosing] = useState(false);
  
  // setting t object for translation utility 
  const { t, i18n } = useTranslation();
  
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
        <h1 className="ml-4 font-bold">Forms submitted successfully, thank you!</h1>
        <div className="help-resources"> 
          <div className="h-4" /> {/* Blank row/space */}
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource1')}</p>
          <div className="h-4" /> {/* Another blank row/space */}
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource2')}</p>
          <div className="h-4" /> {/* Another blank row/space */}
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource3')}</p>
          <div className="h-4" /> {/* Another blank row/space */}
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource4')}</p>
          <div className="h-4" /> {/* Another blank row/space */}
        </div>
        <h1 className="ml-4 italic">You may now close this browser window.</h1>

        
      </div>
    </NavigationControl>
  );
};

export default SuccessPage;