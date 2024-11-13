import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stepper, Step, StepLabel, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Create a styled Stepper component to control its size
const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: '66.66%',
  maxWidth: '100%',
  margin: '0 auto',
}));

function ProgressBar() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
    
    const { t } = useTranslation();
    
  useEffect(() => {
    switch (location.pathname) {
      case '/sdoh':
        setActiveStep(1);
        break;
      case '/validateusr':
        setActiveStep(2);
        break;
      case '/utform':
        setActiveStep(3);
        break;
      case '/successpage':
        setActiveStep(4);
        break;
      default:
        setActiveStep(0);
    }
  }, [location]);

  // Univ TN Orange
  const utOrange = '#F77F00'; 
  
  return (

      <StyledStepper activeStep={activeStep} alternativeLabel>
        {['Welcome', 'Verify Visit', 'Validate Patient', 'Document Form', 'All Done!'].map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{
              '& .MuiStepLabel-iconContainer .Mui-active, & .MuiStepLabel-iconContainer .Mui-completed': {
                color: utOrange, 
              },
            }}
            onClick={(event) => event.preventDefault()}
            >
              {t(`progressBar.steps.${label}`)}
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>
  );
}

export default ProgressBar;