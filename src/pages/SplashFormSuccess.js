import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NotFound() {   
    let location = useLocation();
    const navigate = useNavigate();
    console.log(location.page);
    console.log(window.location.href);

    
      const handleClick = () => {
        // Use navigate to go back to the home page in router
        navigate('/');
      };

    return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>{location.page}</p>
      <div>
      <button onClick={handleClick}>START OVER</button>
    </div>
    </div>
  );
}

export default NotFound;
