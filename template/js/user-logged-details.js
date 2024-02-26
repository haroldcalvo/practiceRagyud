
function userLoggedDetails(callback) {

    var url = user_logged_url();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Request succeeded
                callback(this.responseText); // Pass the response to the callback function
            } else {
                // Request failed
                callback(null); // Pass null to indicate failure
            }
        }
    };
}