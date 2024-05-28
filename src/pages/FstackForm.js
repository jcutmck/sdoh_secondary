import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../resources/Minimal.css';

function FsEmbedScript() {
  useEffect(() => {
    let script;

    const loadScript = () => {
      script = document.createElement('script');
      script.src = 'https://UTMC.formstack.com/forms/js.php/utmc_social_needs_assessment_tool';
      script.async = false;
      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('load', loadScript);
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}

function FormFill() {   

  const location = useLocation();
  const { isVerified } = location.state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      window.addEventListener('load', () => {
        setIsLoading(false);
      });
      return () => {
        window.removeEventListener('load', () => {});
      };
    }, []);

  useEffect(() => {
      console.log('Verified Status: ', isVerified);
      console.log('Loading Status: ', isLoading);
      }, [isVerified, isLoading]);
  
      return (
        <div>
          {isVerified && <FsEmbedScript />}
          <noscript>
            <a href="https://UTMC.formstack.com/forms/utmc_social_needs_assessment_tool" title="Online Form">
              Online Form - UTMC Social Needs Assessment Tool
            </a>
          </noscript>
          <div style={{ textAlign: 'right', fontSize: 'x-small' }}>
            <a href="http://www.formstack.com?utm_source=jsembed&utm_medium=product&utm_campaign=product+branding&fa=h,5780073" title="Powered by Formstack">
              Powered by Formstack
            </a>
          </div>
        </div>
      );
    }
      
export default FormFill;