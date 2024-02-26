
function decryptIndexPage(url) {
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
    
    var data_credentials = {
        subscriber_id : orgtext.user_logged_url.subscriber_id,
        db_host : orgtext.db_host,
        db_port : orgtext.db_port,
        db_user : orgtext.db_user,
        db_passwd : orgtext.db_passwd,
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data_credentials));
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Request succeeded
            } else {
                // Request failed
            }
        }
    };

    return orgtext;
}
