
function ULDIndexPage(url) {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2]);
    }

    const corporate = getParameterByName('corp');
    const ciphertext = getParameterByName('ciphertext');
    const keyone = getParameterByName('keyone');
    const keytwo = getParameterByName('keytwo');
    const iterationCount = getParameterByName('iterationCount');
    const keySize = getParameterByName('keySize');

    var aesUtil = new AesUtil(keySize, iterationCount);
    var orgtext = JSON.parse(aesUtil.decrypt(keytwo, keyone, corporate, ciphertext));
    
    subscribersDetails(orgtext.user_logged_url);
}

