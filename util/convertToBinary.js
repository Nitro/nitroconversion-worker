const atob = require('atob');

module.exports = (dataURI) => {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = atob(base64);
    const rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    let i;
  
    for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}