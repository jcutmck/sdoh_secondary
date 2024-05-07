import React from 'react';
import './Header.css'; // Import your CSS file for header styles (optional)

const Header = () => {
  return (
    <header className="main-header">
      <img src="../resources/media/logo.svg" alt="ut_logo" />

      <nav>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
};

export default Header;