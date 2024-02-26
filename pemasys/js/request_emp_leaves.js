function noenter() {
    return !(window.event && window.event.keyCode == 13); 
}
function fetch_inputs(index) {
    $('#request_id').val(jsonObj[index].request_id);
    $('#leave_credits_entry_id').val(jsonObj[index].leave_credits_entry_id);
    $('#leave_credits_entry_description').val(jsonObj[index].leave_credit_entry_description);
    $('#starting_date_applied').val(jsonObj[index].starting_date_applied);
    $('#number_of_hours').val(jsonObj[index].number_of_hours);
    $('#remarks').val(jsonObj[index].remarks);
}
function viewData(index) {
    fetch_inputs(index);
    $('#largeModalLabel').text('View Request Employee Leave');
    $('#save-message,#delete-message').remove();
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').attr('readOnly',true);
    $('#btnSave,#btnCancel').hide();
}
function updateData(index) {
    fetch_inputs(index);
    $('#largeModalLabel').text('Edit Request Employee Leave');
    $('#save-message,#delete-message').remove();
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').removeAttr('readOnly',true);
    $('#btnSave').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
}
function addData(index) {
    $('#largeModalLabel').text('Add Request Employee Leave');
    $('#save-message,#delete-message').remove();
    $('#btnSave').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').removeAttr('readOnly',true); 
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').val('');  
    $('#request_id,#leave_credits_entry_id').val(0);
}

function approve(index) {
	$('#largeModalLabel').text('Approve Request Employee Leave');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').attr('readOnly',true);
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
                    jsonObjExecuteService ["procedure_name_given"] = "approveLeaveRequest";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
                    jsonObjExecuteService ["user_id"] = unique_application_user_id;

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
function disapprove(index) {
	$('#largeModalLabel').text('Disapprove Request Employee Leave');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">disapprove</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').attr('readOnly',true);
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
                    jsonObjExecuteService ["procedure_name_given"] = "disapproveLeaveRequest";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
                    jsonObjExecuteService ["user_id"] = unique_application_user_id;

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
	$('#largeModalLabel').text('Cancel Request Employee Leave');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">cancel</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').attr('readOnly',true);
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "cancelledLeaveRequest";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
            jsonObjExecuteService ["user_id"] = unique_application_user_id;

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
        },1200);
    });
    $('#btnSave').hide();
}

$(document).ready(function(){
    window.allocatedIds = [];
    requestIdArray = [];
    window.allocateReturnId = function(entry_id) {
        let check_user_id = function() {
            setTimeout(function() {
                if (unique_application_user_id == 0 && typeof unique_application_user_id === undefined) {
                    check_user_id();
                    }else {
                        entry_id && window.allocatedIds.push(entry_id);
                        var storedEntryIdNumber = parseInt(entry_id);
                        jsonObj = [];
                        jsonObjExecuteService = {};
                        jsonObjExecuteService ["procedure_name_given"] = "getRequestLeave";  //given json element do not remove
                        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                        // here is to create jsonObject needed for procedure
                        jsonObjExecuteService ["request_id"] = 0;

                        executeService(jsonObjExecuteService, function(response_from_service) {
                            jsonObj = response_from_service;
                            $('.no-available-data-approved,.no-available-data-request').remove();
                            $('#approve_employee_leave_table').parent().append('<label class="no-available-data-approved control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
                            $('#request_employee_leave_table').parent().append('<label class="no-available-data-request control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
                            if (storedEntryIdNumber) {
                                appendRequestTable();
                                appendApproveTable();
                            }
                        });
                        document.getElementById('searchname').addEventListener("keyup", function() {
                            if (event.key == "Enter") {
                                jsonObj.forEach(function(item) {
                                    if (item.hasOwnProperty('request_id')) {
                                        requestIdArray.push(item.request_id);
                                    }
                                });
                                appendRequestTable();
                                appendApproveTable();
                            }
                        });

                        function appendRequestTable(){

                            var input = document.getElementById('searchname');
                            var filter = input.value.trim().toLowerCase();
    
                            var data = jsonObj.filter(function(item) {
                                return Object.values(item).some(function(value) {
                                    return String(value).toLowerCase().includes(filter);
                                });
                            });
    
                            var table = $('#request_employee_leave_table')[0];
                            var tbody = table.getElementsByTagName('tbody')[0];
                            tbody.innerHTML = ''; // Clear existing rows
                        
                            if (data.length !== 0) {
                                for (let i = 0; i < data.length; i++) {
                                    
                                    var buttonsChange = ``;
                                    if(data[i].requested_by == unique_application_user_id){
                                        $('#btnSave,#btnCancel').show();
                                        if(data[i].approved != 0 || data[i].cancelled != 0 || data[i].disapproved != 0){
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                        }else{
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                            <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;
                                                            <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#largeModal" onclick="cancel(${i})">Cancel</button>&nbsp;`;
                                        }
                                    }else{
                                        $('#btnSave,#btnCancel').hide();
                                        if(data[i].approved != 0 || data[i].cancelled != 0 || data[i].disapproved != 0){
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                        }else{
                                            buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                            <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#largeModal" onclick="approve(${i})">Approve</button>&nbsp;
                                                            <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#largeModal" onclick="disapprove(${i})">Disapprove</button>&nbsp;`;
                                        }
                                    }

                                    if(data[i].approved === 0){
                                        $('.no-available-data-request').remove();
                                        const newRow = document.createElement("tr");
                                        newRow.innerHTML =`<td class="autoCaps">${data[i].leave_credit_entry_description}</td>
                                                            <td>${data[i].starting_date_applied}</td>
                                                            <td>${data[i].number_of_hours}</td>
                                                            <td>${data[i].status}</td>
                                                            <td>
                                                                ${buttonsChange}
                                                            </td>`;
                                        tbody.appendChild(newRow);
                                        if(requestIdArray.length === 0){
                                            if (filter === "" && window.allocatedIds.length !== 0 && !window.allocatedIds.includes(data[i].request_id)) {
                                                tbody.removeChild(newRow);
                                            }
                                        }
                                        if (window.allocatedIds.includes(data[i].request_id)) {
                                            $(newRow).find('td').css('background-color', '#d6e3f0');
                                        }
                                    }
                                }
                            }else{
                                $('.no-available-data-request').remove();
                                $('#request_employee_leave_table').parent().append('<label class="no-available-data-request control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                            }
                        }

                        function appendApproveTable(){
                            
                            var input = document.getElementById('searchname');
                            var filter = input.value.trim().toLowerCase();
                            
                            var data = jsonObj.filter(function(item) {
                                return Object.values(item).some(function(value) {
                                    return String(value).toLowerCase().includes(filter);
                                });
                            });
                           
                            var tableApprove = $('#approve_employee_leave_table')[0];
                            var tbodyApprove = tableApprove.getElementsByTagName('tbody')[0];
                            tbodyApprove.innerHTML = ''; // Clear existing rows
                            
                            if (data.length !== 0) {
                                for (let i = 0; i < data.length; i++) {
                                    $('.no-available-data-approved').remove();
                                    if(requestIdArray.length !== 0 && data[i].approved !== 0){
                                        const newRowApprove = document.createElement("tr");
                                        newRowApprove.innerHTML = `<td class="autoCaps">${data[i].leave_credit_entry_description}</td>
                                                                    <td>${data[i].starting_date_applied}</td>
                                                                    <td>${data[i].number_of_hours}</td>
                                                                    <td>${data[i].status}</td>
                                                                    <td>
                                                                        <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                                    </td>`;
                                        tbodyApprove.appendChild(newRowApprove);
                                    }else{
                                        $('.no-available-data-approved').remove();
                                        $('#approve_employee_leave_table').parent().append('<label class="no-available-data-approved control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                                    }
                                }
                            }else{
                                $('.no-available-data-approved').remove();
                                $('#approve_employee_leave_table').parent().append('<label class="no-available-data-approved control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                            }
                        }

                    }
                
                }, 500);
        };
        check_user_id();
    }
});
var autocompleteInstance = null;
$('#leave_credits_entry_description').keypress(function(event) {
    // If the user presses the "Enter" key on the keyboard
    $('#leave_credits_entry_id').val(0);
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
    jsonObjExecuteService ["procedure_name_given"] = "getEmployeeLeaveCredits";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["entry_id"] = 0;
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].employee_description;
        }
        initializeItemType(arrInfo);
        document.getElementById('leave_credits_entry_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#leave_credits_entry_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#leave_credits_entry_id').val(e.entry_id)
            }
        });
    }
}