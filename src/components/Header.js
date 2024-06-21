import React from 'react';
import '../resources/Header.css'; // Import your CSS file for header styles (optional)
import utlogo from '../resources/media/utmck_logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={utlogo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;