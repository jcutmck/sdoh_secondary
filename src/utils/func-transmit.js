//send data from react app to iframe
function sendDataToIframe(id,data,endpoint){       
    const iframe = document.getElementById(id);
    if (iframe) {
      iframe.contentWindow.postMessage(data, endpoint);
    }
};

export default sendDataToIframe;