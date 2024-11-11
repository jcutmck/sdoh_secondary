import React from 'react';
import '../resources/Header.css'; // Import your CSS file for header styles (optional)
import utlogo from '../resources/media/utmck_logo.png'
import LanguageSwitcher from './LanguageSwitcher'; // Import the LanguageSwitcher
import ProgressBar from '../components/ProgressBar';
import { Box } from '@mui/material'; // Import Box


const Header = () => {
  return (
    <header className="header">
      <div className="header-content"> {/* Container for top row */}
        <div className="logo">
          <img src={utlogo} alt="Logo" />
        </div>
        <div className="language-switcher"> {/* Container for the switcher */}
          <LanguageSwitcher />
        </div>
      </div>
      <Box sx={{ width: '100%', marginTop: 2 }}> {/* Full-width container */}
        <ProgressBar />
      </Box>
    </header>
  );
};

export default Header;