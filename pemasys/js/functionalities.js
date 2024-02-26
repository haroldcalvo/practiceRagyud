
userLoggedDetails(function (uld) {
    let app_details = JSON.parse(uld);
    let subscriber_id = app_details.subscriber_id;
    $('#application_image_logo').attr('src',`${sessionStorage.getItem("application_image")}`);
    $('.subscriber_logo').attr('src',`${sessionStorage.getItem("logo")}`);
    
    const jsonData = {
        subscriber_user_id: subscriber_id,
        db_name: app_details.application_user_details.app_db_name,
        user_id: app_details.application_user_details.app_user_id
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", host+"/EmployeeProfile-API/application/modules/service/functionalities", true);
    xhr.send(JSON.stringify(jsonData));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Request succeeded
                const list_of_groups = JSON.parse(this.responseText);

                functionalitiesInspector(list_of_groups);

                const parentDivgrp_side_bar = document.getElementById(`side-bar-list-grp-functions`);
                const ulDivgrp_side_bar = parentDivgrp_side_bar.querySelector('ul');

                const parentDivgrp_top_bar = document.getElementById(`top-bar-list-grp-functions`);
                const ulDivgrp_top_bar = parentDivgrp_top_bar.querySelector('ul');

                bar_functionalities();

                function bar_functionalities() {
                    fetch_functionalities(ulDivgrp_side_bar, list_of_groups);
                    fetch_functionalities(ulDivgrp_top_bar, list_of_groups);
                }

                function fetch_functionalities(in_ulDivgrp, in_list_of_groups) {
                    in_list_of_groups.forEach(logrp => {
                        groupFunctions(in_ulDivgrp, logrp);
                    });
                }

                function groupFunctions(in_ulDivgrp, logrp) {
                    
                    const group = `group-${logrp.grouping_id}`;
                    const group_function = `group-function-${logrp.grouping_id}`;

                    //append group
                    let img_grp = "";

                    if (logrp.grouping_image != undefined && logrp.grouping_image != "") {
                        img_grp = `<img src="${logrp.grouping_image}" class="transition-element appear-functionalities" width="30" height="30"/>`;
                    }

                    const newRow_li = document.createElement("li");
                    newRow_li.setAttribute('id', `${group}`);
                    newRow_li.classList.add('has-sub','appear-functionalities');
                    newRow_li.innerHTML = `<a class="js-arrow appear-functionalities" href="#">
                                                ${img_grp}
                                                ${logrp.grouping_name} &nbsp;<i class="fa fa-angle-down appear-functionalities"></i>
                                            </a>
                                            <ul id="${group_function}" class="navbar-mobile-sub__list list-unstyled js-sub-list" style="display: none;"></ul>`;
                    in_ulDivgrp.appendChild(newRow_li);

                    //append group functionalities
                    const parentDivgrpfunc = document.getElementById(group);
                    const ulDivfunc = parentDivgrpfunc.querySelector('ul');

                    logrp.list_of_functionalities.forEach(logrp_func => {

                        let img = "";

                        if (logrp_func.image != undefined && logrp_func.image != "") {
                            img = `<img src="${logrp_func.image}" alt="" class="transition-element" width="30" height="30"/>`;
                        }

                        const newRow_li = document.createElement("li");
                        newRow_li.innerHTML = `<a class="js-arrow" href="${logrp_func.url}">
                                                    ${img}
                                                    ${logrp_func.description}
                                                </a>`;
                        ulDivfunc.appendChild(newRow_li);
                    });

                    $(document).on('click', '.appear-functionalities', function(event) {
                        if ($(event.target).hasClass('appear-functionalities')) {
                            var $ul = $(this).children('ul');
                            var displayStyle = $ul.css('display');
                    
                            setTimeout(function() {
                                if (displayStyle === 'none') {
                                    $ul.show(400);
                                } else if (displayStyle === 'block') {
                                    $ul.hide(400);
                                }
                            }, 1);
                        }
                    });
                }
            }
        }
    };
});

document.writeln("<script src='../template/js/user-logged-details.js'></script >");
document.writeln("<script src='../template/js/common-index-pages.js'></script >");
