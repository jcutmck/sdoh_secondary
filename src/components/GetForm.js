
export const getForm = () => {

    fetch('https://www.formstack.com/api/v2/form/5078847/field.json', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer [[app:oauth_token]]',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
    });
}