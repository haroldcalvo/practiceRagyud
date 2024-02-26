function logoutToPortal(file) {

    let path = '';
    for (let i = 0; i < file; i++) {
        path += '../';
    }

    if (deployment()) {
        window.location.href=`${window.location.protocol+"//"+window.location.host}/dashboard-app-module/index.html`;
    } else {
        window.location.href=`${path}dashboard-app-module/index.html`;
    }
}

let check_user = function() {
    setTimeout(function() {
        userLoggedDetails(function (uld) {
            var ul = JSON.parse(uld);
            if (JSON.stringify(ul).length === 0) {
                check_user();
            }else {
                $('.welcome-username').text(ul.user_name_logged);
                $('.welcome-useremail').text(ul.user_email_logged);
            }
        })
        
    }, 500);
};
check_user();