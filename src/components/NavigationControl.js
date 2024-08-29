import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const NavigationControl = ({ children, redirectPath = '/' }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleNavigation = (event) => {
        // Clear session data
        localStorage.removeItem('session_id');
        // Redirect to specified path
        navigate(redirectPath, { replace: true });
      };
  
      window.addEventListener('popstate', handleNavigation);
  
      return () => {
        window.removeEventListener('popstate', handleNavigation);
      };
    }, [navigate, redirectPath]);
  
    return <>{children}</>;
  };
  
  export default NavigationControl;