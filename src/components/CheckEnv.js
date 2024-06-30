// src/components/CheckEnv.js
import React, { useEffect } from 'react';

const CheckEnv = () => {
  useEffect(() => {
    console.log('Current NODE_ENV:', process.env.NODE_ENV);
    console.log('Current REACT_APP_ENV:', process.env.REACT_APP_ENV);
    console.log('API URL:', process.env.REACT_APP_BE_API);
  }, []);

  return (
    <div>
      <p>Check the console to see the current NODE_ENV and REACT_APP_ENV values.</p>
    </div>
  );
};

export default CheckEnv;