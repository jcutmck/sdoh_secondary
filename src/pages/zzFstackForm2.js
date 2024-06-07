const SdohForm = () => {

return(
    <div>
        <p style={{
            marginLeft: '1em', 
            marginBottom: '1em', 
            color: '#FF8200', 
            fontWeight: 'bold'
            }}
        > 
            Your visit has been successfully verified! 
        </p>        
        
        <p style={{
            marginLeft: '1em',
            marginBottom: '1em', 
            color: '#FF8200', 
            fontWeight: 'bold'
            }}
        >
            Please complete any form(s) listed below prior to your visit: 
        </p>

        <a  
            href="https://UTMC.formstack.com/forms/utmc_social_needs_assessment_tool" title="Online Form"
            style={{
            marginLeft: '2em', 
            color: '#000080', 
            textDecoration: 'underline'
        }}
        >
            UTMC Social Needs Assessment Tool
        </a>
    </div>
)};  
export default SdohForm;
