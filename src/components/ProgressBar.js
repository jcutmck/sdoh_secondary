import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stepper, Step, StepLabel, styled } from '@mui/material';

// Create a styled Stepper component to control its size
const StyledStepper = styled(Stepper)(({ theme }) => ({
  // Set the width to 66.66% (approximately 2/3)
  width: '66.66%',
  // Ensure it remains responsive by setting maxWidth to 100%
  maxWidth: '100%',
  // Center the Stepper horizontally
  margin: '0 auto',
}));

function ProgressBar() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Map the current path to the corresponding step
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

  // University of Tennessee orange color
  const utOrange = '#F77F00'; 

  return (
    <Box sx={{ width: '40%', marginTop: 2 }}>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {/* Render the steps with labels */}
        {['Welcome', 'Verify Visit', 'Validate Patient', 'Document Form', 'All Done!'].map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{
              '& .MuiStepLabel-iconContainer .Mui-active, & .MuiStepLabel-iconContainer .Mui-completed': {
                color: utOrange, 
              },
            }}
            onClick={(event) => event.preventDefault()}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>
    </Box>
  );
}

export default ProgressBar;