function noenter() {
    return !(window.event && window.event.keyCode == 13); 
}
function fetch_inputs(index) {
    $('#request_id').val(jsonObj[index].request_id);
    $('#employee_id').val(jsonObj[index].employee_id);
    $('#employee_description').val(jsonObj[index].employee_description);
    $('#leave_id').val(jsonObj[index].leave_id);
    $('#leave_description').val(jsonObj[index].leave_description);
    $('#leave_credits_in_hours').val(jsonObj[index].leave_credits_in_hours);
}
function viewData(index) {
    fetch_inputs(index);
    $('#largeModalLabel').text('View Request Employee Leave Credit');
    $('#save-message,#delete-message').remove();
    $('#employee_description,#leave_description,#leave_credits_in_hours').attr('readOnly',true);
    $('#btnSave,#btnCancel').hide();
}
function updateData(index) {
    fetch_inputs(index);
    $('#largeModalLabel').text('Edit Request Employee Leave Credit');
    $('#save-message,#delete-message').remove();
    $('#employee_description,#leave_description,#leave_credits_in_hours').removeAttr('readOnly',true);
    $('#btnSave').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
}
function addData(index) {
    $('#largeModalLabel').text('Add Request Employee Leave Credit');
    $('#save-message,#delete-message').remove();
    $('#btnSave').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
    $('#employee_description,#leave_description,#leave_credits_in_hours').removeAttr('readOnly',true);  
    $('#employee_description,#leave_description,#leave_credits_in_hours').val('');  
    $('#request_id,#employee_id,#leave_id').val(0);
}
function approve(index) {
	$('#largeModalLabel').text('Approve Request Payable Adjustment');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#employee_description,#leave_description,#leave_credits_in_hours').attr('readOnly',true);
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "approvingOfficerCeiling";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["user_id"] = unique_application_user_id;

            executeService(jsonObjExecuteService, function(response_from_service) {

                $('.div-loader').removeClass('loader-line');
                var success = response_from_service.success;
                if(success > 0){
                    jsonObjExecuteService = {};
                    jsonObjExecuteService ["procedure_name_given"] = "postJSONApproveRQEmployeesLeaveCredits";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
                    jsonObjExecuteService ["user"] = unique_application_user_id;

                    executeService(jsonObjExecuteService, function(response_from_service) {

                        $('.div-loader').removeClass('loader-line');
                        var success = response_from_service.success;
                        if(success > 0){
                            $('.close').remove();
                            $('#message-form').prepend('<span id="continue-to-reload" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok">Continue</span></small><br></span>');
                            $('#continue-to-reload').click(function(){
                                $('#largeModal').modal('hide');
                                $('#continue-to-reload').remove();
                                allocateReturnId(jsonObj[index].request_id);
                            });
                        }else {
                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                        }
                        $('#err-save-message-ok').click(function(){
                            approve(index);
                        });

                    });
                }else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                }
                $('#err-save-message-ok').click(function(){
                    approve(index);
                });

            });
        },1200);
    });
    $('#btnSave').hide();
}

function cancel(index) {
	$('#largeModalLabel').text('Approve Request Payable Adjustment');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#employee_description,#leave_description,#leave_credits_in_hours').attr('readOnly',true);
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "approvingOfficerCeiling";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["user_id"] = unique_application_user_id;

            executeService(jsonObjExecuteService, function(response_from_service) {

                $('.div-loader').removeClass('loader-line');
                var success = response_from_service.success;
                if(success > 0){
                    jsonObjExecuteService = {};
                    jsonObjExecuteService ["procedure_name_given"] = "postJSONCancelRQEmployeesLeaveCredits";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
                    jsonObjExecuteService ["user"] = unique_application_user_id;

                    executeService(jsonObjExecuteService, function(response_from_service) {

                        $('.div-loader').removeClass('loader-line');
                        var success = response_from_service.success;
                        if(success > 0){
                            $('#message-form').prepend('<span id="continue-to-reload" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok">Continue</span></small><br></span>');
                            $('#continue-to-reload').click(function(){
                                $('#largeModal').modal('hide');
                                $('#continue-to-reload').remove();
                                const tbody = document.querySelector("#request_employee_leave_credit_table tbody");
                                const rows = tbody.getElementsByTagName("tr");
                                tbody.removeChild(rows[index]);
                                allocateReturnId();
                            });
                        }else {
                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                        }
                        $('#err-save-message-ok').click(function(){
                            approve(index);
                        });

                    });
                }else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                }
                $('#err-save-message-ok').click(function(){
                    approve(index);
                });

            });
        },1200);
    });
    $('#btnSave').hide();
}


$(document).ready(function(){
    window.allocateReturnId = function(entry_id) {
        let check_user_id = function() {
            setTimeout(function() {
                if (unique_application_user_id == 0 && typeof unique_application_user_id === undefined) {
                    check_user_id();
                    }else {
                        jsonObj = [];
                        jsonObjExecuteService = {};
                        jsonObjExecuteService ["procedure_name_given"] = "getRequestEmployeeLeaveCredits";  //given json element do not remove
                        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                        // here is to create jsonObject needed for procedure
                        jsonObjExecuteService ["request_id"] = 0;

                        executeService(jsonObjExecuteService, function(response_from_service) {
                            originalData = response_from_service;
                            filterAndPopulateTable('#request_employee_leave_credit_table');
                            var storedEntryIdNumber = parseInt(entry_id);
                            var filteredLeaveData = originalData.filter(function(item) {
                                return item.request_id === storedEntryIdNumber;
                            });
                            if (storedEntryIdNumber) {
                                $('.no-available-data').remove();
                                populateTable('#request_employee_leave_credit_table', filteredLeaveData);
                                $('#request_employee_leave_credit_table tbody tr').find('td').css('background-color', '#d6e3f0');
                            }

                        });

                        function populateTable(tableId, data) {
                                        
                            const table = document.querySelector(tableId);
                            const tbody = table.querySelector('tbody');
                            tbody.innerHTML = ''; // Clear existing rows

                            if(approving_officer > 0){
                                var tableApprove = $('#approve_employee_leave_credit_table')[0];
                                var tbodyApprove = tableApprove.getElementsByTagName('tbody')[0];
                                tbodyApprove.innerHTML = ''; // Clear existing rows
                            }
                        
                            if (data.length !== 0) {
                                jsonObj = [];
                                for (let i = 0; i < data.length; i++) {
                                    
                                    item = {};
                                    item ["request_id"] = data[i].request_id;
                                    item ["employee_id"] = data[i].employee_id;
                                    item ["employee_description"] = data[i].employee_description;
                                    item ["leave_id"] = data[i].leave_id;
                                    item ["leave_description"] = data[i].leave_description;
                                    item ["leave_credits_in_hours"] = data[i].leave_credits_in_hours;
                                    item ["requested_by"] = data[i].requested_by;
                                    item ["datetime_requested"] = data[i].datetime_requested;
                                    item ["datetime_modified"] = data[i].datetime_modified;
                                    item ["approved"] = data[i].approved === 1 ? "Approved" : "";
                                    item ["approved_by"] = data[i].approved_by;
                                    item ["datetime_approved"] = data[i].datetime_approved;
                                    item ["cancelled"] = data[i].cancelled === 1 ? "Cancelled" : "";
                                    item ["cancelled_by"] = data[i].cancelled_by;
                                    item ["datetime_cancelled"] = data[i].datetime_cancelled;
                                    item ["status"] = data[i].status;
                                    item ["approved_leave_credits"] = data[i].approved_leave_credits;
                                    jsonObj.push(item);

                                    var buttonApprove = ``;
                                    if(approving_officer > 0){
                                        let allApproved = true;
                                        for (let i = 0; i < data.length; i++) {
                                            if (data[i].approved > 0) {
                                                allApproved = false;
                                                break;
                                            }
                                        }
                                        if (allApproved) {
                                            $('.no-available-data').remove();
                                            $('#approve_employee_leave_credit_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                                        } else {
                                            if (data[i].approved > 0) {
                                                const newRowApprove = document.createElement("tr");
                                                newRowApprove.innerHTML = `<td class="autoCaps">${data[i].employee_description}</td>
                                                                            <td>${data[i].leave_description}</td>
                                                                            <td>${data[i].status}</td>
                                                                            <td>
                                                                                <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                                            </td>`;
                                                tbodyApprove.appendChild(newRowApprove);
                                            }
                                        }
                                        buttonApprove = `<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#largeModal" onclick="approve(${i})">Approve</button>&nbsp;
                                                        <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#largeModal" onclick="cancel(${i})">Cancel</button>&nbsp;`;
                                    }


                                    var buttonsChange = ``;
                                    if(data[i].requested_by == unique_application_user_id){
                                        $('#btnSave,#btnCancel').show();
                                        if(data[i].approved != 0 || data[i].cancelled != 0){
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                        }else{
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                            <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;`;
                                        }
                                    }else{
                                        $('#btnSave,#btnCancel').hide();
                                        if(data[i].approved != 0 || data[i].cancelled != 0){
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                        }else{
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                            ${buttonApprove}`;
                                        }
                                    }
                                    let allApproved = true;
                                    for (let i = 0; i < data.length; i++) {
                                        if (data[i].approved !== 1) {
                                            allApproved = false;
                                            break;
                                        }
                                    }
                                    if (allApproved) {
                                        $('.no-available-data').remove();
                                        $(tableId).parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                                    } else {
                                        if (data[i].approved === 0) {
                                            const newRow = document.createElement("tr");
                                            newRow.innerHTML = `<td class="autoCaps">${data[i].employee_description}</td>
                                                                <td>${data[i].leave_description}</td>
                                                                <td>${data[i].status}</td> 
                                                                <td>
                                                                    ${buttonsChange}
                                                                </td>`;
                                            tbody.appendChild(newRow);
                                        }
                                    }
                                }
                            }
                        }

                        document.getElementById('searchname').addEventListener("keyup", function() {
                            if (event.key == "Enter") {
                                // Remove existing "No available data" labels
                                $('.no-available-data').remove();
                                filterAndPopulateTable('#request_employee_leave_credit_table');
                            }
                        });
                        document.getElementById('btnSearch').addEventListener('click', function() {
                            // Remove existing "No available data" labels
                            $('.no-available-data').remove();
                            filterAndPopulateTable('#request_employee_leave_credit_table');
                        });
                        
                        function filterAndPopulateTable(tableId) {
                            
                            var input, filter, table, tr, td, i, txtValue;
                            input = document.getElementById('searchname');
                            filter = input.value.trim().toLowerCase(); // Trim and convert search query to lowercase
                            table = $(tableId)[0];
                            tr = table.getElementsByTagName('tr');
                            
                            // Remove existing "No available data" labels
                            $('.no-available-data').remove();
                            
                            // Clear the table if search query is empty
                            if (filter === "") {
                                $(table).find('tbody').empty(); // Clear the table body
                                $(tableId).parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
                                $('#approve_employee_leave_credit_table').find('tbody').empty(); // Clear the table body
                                $('#approve_employee_leave_credit_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
                                return; // Exit the function if the search query is empty
                            }
                            
                            // Filter the original data based on the search query
                            var filteredData = originalData.filter(function(item) {
                                return Object.values(item).some(function(value) {
                                    return String(value).toLowerCase().includes(filter);
                                });
                            });
                        
                            // Populate the table with the filtered data
                            populateTable(tableId, filteredData);
                        
                            if (filteredData.length === 0) {
                                $(tableId).parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                                $('#approve_employee_leave_credit_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                            }
                        }

                    }
                
                }, 500);
        };
        check_user_id();
    }
});
var autocompleteInstance = null;
$('#employee_description').keypress(function(event) {
    // If the user presses the "Enter" key on the keyboard
    $('#employee_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if($(this).val() !== ""){
            employeeProfile($(this).val());
        }
    }
});
function employeeProfile(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getEmployeeInfo";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["employee_ID"] = 0;
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].employee_name;
        }
        initializeItemType(arrInfo);
        document.getElementById('employee_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#employee_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#employee_id').val(e.employee_id);
                $('#emp_type').val(e.employee_type_id);
                $('#years_service').val(e.years_in_service);

            }
        });
    }
}
$('#leave_description').keypress(function(event) {
    // If the user presses the "Enter" key on the keyboard
    $('#leave_id').val(0);
    $('#leave_credits_in_hours').val('');
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if($(this).val() !== ""){
            leaveDefinition($(this).val());
        }
    }
});
function leaveDefinition(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getPersonnelLeaveDefinition";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["leave_id"] = 0;

    executeService(jsonObjExecuteService, function(response_from_service) {
        const emp_id = $('#employee_id').val();
        const matchingObjects = originalData.filter(item => (item.employee_id == emp_id) && ((item.approved === 1) || (item.approved === 0 && item.cancelled === 0)));
        const leave_ids = matchingObjects.map(item => item.leave_id);
        var arrInfo = response_from_service;
        arrInfo = arrInfo.filter(item => !leave_ids.includes(item.leave_id));
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('leave_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#leave_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#leave_id').val(e.leave_id);

                const empYearsServince = parseInt($('#years_service').val()) * 12;
                if (empYearsServince >= e.tenure_in_months) {
                    $('#save-message').remove();
                    if(parseInt($('#emp_type').val()) == e.employee_type_id){
                        $('#save-message').remove();
                        $('#btnSave').removeAttr('disabled',true);
                    }else{
                        $('#save-message').remove();
	                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">This leave definition is only applicable to '+e.employee_type_description+'.</small><br></span>');
                        $('#btnSave').attr('disabled',true);
                    }
                } else {
                    $('#save-message').remove();
	                $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">This employee is not eligible for this leave definition.</small><br></span>');
                    $('#btnSave').attr('disabled',true);
                }

                $('#leave_credits_in_hours').on('keyup',function(){
                    var credits_value = $(this).val();
                    if (e.min_number_of_hours !== 0 || e.max_number_of_hours !== 0) {
                        if (credits_value < e.min_number_of_hours) {
                            $('#save-message').remove();
                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">This leave definition is must be greater than minimum hours ('+e.min_number_of_hours+').</small><br></span>');
                            $('#btnSave').attr('disabled',true);
                        } else if (credits_value > e.max_number_of_hours) {
                            $('#save-message').remove();
                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">This leave definition is must be greater than maximum hours ('+e.max_number_of_hours+').</small><br></span>');
                            $('#btnSave').attr('disabled',true);
                        }else{
                            $('#save-message').remove();
                            $('#btnSave').removeAttr('disabled',true);
                        }
                    }else{
                        $('#save-message').remove();
                        $('#btnSave').removeAttr('disabled',true);
                    }
                });

            }
        });
    }
}