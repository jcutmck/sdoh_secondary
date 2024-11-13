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

  return (
    <NavigationControl redirectPath="/">
      <div>
        <h1 className="ml-4 font-bold">{t('endthankyou')}</h1>
        <div className="help-resources"> 
          <div className="h-4" /> 
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource1')}</p>

          <div className="h-4" /> 
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource2')}{' '}
            <a href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
            >
              https://www.thehotline.org/
            </a>
          </p>
          <div className="h-4" /> 
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource3')}{' '}
            <a href="https://www.feedingamerica.org/find-your-local-foodbank" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline' }}
              >
              https://www.feedingamerica.org/find-your-local-foodbank
            </a>
          
          </p>
          <div className="h-4" /> 
          <p className="ml-4 max-w-[60em] break-words">{t('helpresource4')}{' '}
            <a href="https://www.findhelp.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline' }}
              >
              https://www.findhelp.org/
            </a>
          </p>
          <div className="h-4" /> 
        </div>
        <h1 className="ml-4 italic">{t('closebrowser')}</h1>

        
      </div>
    </NavigationControl>
  );
};

export default SuccessPage;