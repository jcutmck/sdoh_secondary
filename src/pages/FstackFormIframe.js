import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveIframe from '../components/ResponsiveIfrm';
//import sendDataToIframe from '../utilities/func-transmit';
import '../resources/Minimal.css';

function FormFill() {   
  const location = useLocation();
  const { isVerified } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  //const fsid1 = 151828904
  //const fsid2 = 151828905
  //const pids = 12345;
  //const url = 'https://UTMC.formstack.com/forms/utmc_social_needs_assessment_tool'

  useEffect(() => {
    setIsLoading(false); // Directly set loading to false after mount
    }, []);

  useEffect(() => {
    if(isVerified) {
      console.log('Verified Status: ', isVerified);
      console.log('Loading Status: ', isLoading);
    //  sendDataToIframe(151828904,pids,url);
    };
      
      }, [isVerified, isLoading]);



      return (
        <div>
          {isVerified ? <ResponsiveIframe /> :
            <p>Verification has failed.</p> }
        </div> 
      );
    }
      
export default FormFill;