function fetch_inputs(index) {
    $('#emp_request_id').val(jsonObj[index].request_id);
    $('#employee_id').val(jsonObj[index].employee_id);
    $('#employee_id_append').val(jsonObj[index].employee_id);
    $('#employee_description').val(jsonObj[index].employee_name);
    $('#daily_rate').val(numberFormat(parseFloat(jsonObj[index].daily_rate)));
    
    if(jsonObj[index].daily_paid == 1){
        $('#daily_paid').prop('checked',true);
    }else{
        $('#daily_paid').prop('checked',false);
    }
    if(jsonObj[index].entitled_overtime == 1){
        $('#entitled_overtime').prop('checked',true);
    }else{
        $('#entitled_overtime').prop('checked',false);
    }
    if(jsonObj[index].entitled_holiday == 1){
        $('#entitled_holiday').prop('checked',true);
    }else{
        $('#entitled_holiday').prop('checked',false);
    }
    $('#personal_exemption').val(numberFormat(parseFloat(jsonObj[index].personal_exemption)));
    $('#dependents_exemption').val(numberFormat(parseFloat(jsonObj[index].dependents_exemption)));
    $('#total_exemptions').val(numberFormat(parseFloat(jsonObj[index].total_exemptions)));
}
function viewData(index) {
	$('#largeModalLabel').text('View Employee Rate Request');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').attr('readOnly',true);
    $('#daily_paid,#entitled_overtime,#entitled_holiday').attr('disabled',true);
    $('#btnSave,#btnCancel').hide(); 
    $('#amt_validate').remove();
}
function updateData(index) {
	$('#largeModalLabel').text('Update Employee Rate Request');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').removeAttr('readOnly',true);
    $('#daily_paid,#entitled_overtime,#entitled_holiday').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show(); 
    $('#amt_validate').remove();
    $('#btnSave').removeAttr('disabled',true);
}
function addData() {
    $('#emp_request_id,#employee_id,#employee_id_append').val(0);
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').val('');
    $('#daily_paid,#entitled_overtime,#entitled_holiday').prop('checked',false);
	$('#largeModalLabel').text('Add Employee Rate Request');
    $('#save-message,#delete-message').remove();
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').removeAttr('readOnly',true);
    $('#daily_paid,#entitled_overtime,#entitled_holiday').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
    $('#amt_validate').remove();
    $('#btnSave').removeAttr('disabled',true);
}
function approve(index) {
	$('#largeModalLabel').text('Approve Employee Rate Request');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').attr('readOnly',true);
    $('#daily_paid,#entitled_overtime,#entitled_holiday').attr('disabled',true);
    $('#amt_validate').remove();
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "ApproveEmpRate";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
            jsonObjExecuteService ["employee_id"] = jsonObj[index].employee_id;
            jsonObjExecuteService ["approve_by"] = unique_application_user_id;
            executeService(jsonObjExecuteService, function(response_from_service) {

                $('.div-loader').removeClass('loader-line');
                var success = response_from_service.success;
                if(success > 0){
                    $('.close').remove();
                    $('#message-form').prepend('<span id="continue-to-reload" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function(){
                        setTimeout(function(){
                        location.reload();
                        },200);
                    });
                }else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
                }
                $('#err-save-message-ok').click(function(){
                setTimeout(function(){
                    location.reload();
                },200);
                });

            });
        },1200);
    });
    $('#btnSave').hide();
}
function deleteData(index) {
	$('#largeModalLabel').text('Delete Employee Rate Request');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').attr('readOnly',true);
    $('#daily_paid,#entitled_overtime,#entitled_holiday').attr('disabled',true);
    $('#amt_validate').remove();
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "deleteReqEmpRate";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "DELETE"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["request_emp_rate_id"] = jsonObj[index].request_id;
            
            executeService(jsonObjExecuteService, function(response_from_service) {

                $('.div-loader').removeClass('loader-line');
                var success = response_from_service.success;
                if(success > 0){
                    $('.close').remove();
                    $('#message-form').prepend('<span id="continue-to-reload" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function(){
                        setTimeout(function(){
                        location.reload();
                        },200);
                    });
                }else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
                }
                $('#err-save-message-ok').click(function(){
                setTimeout(function(){
                    location.reload();
                },200);
                });

            });
        },1200);
    });
    $('#btnSave').hide();
}
$(document).ready(function(){
    numberFormatterDecimal();

    let check_user_id = function() {
        setTimeout(function() {
        if (unique_application_user_id == 0 && typeof unique_application_user_id === undefined) {
            check_user_id();
        }else { 
                jsonObj = [];
                jsonObjExecuteService = {};
                jsonObjExecuteService ["procedure_name_given"] = "getEmployeeRate";  //given json element do not remove
                jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                // here is to create jsonObject needed for procedure
                jsonObjExecuteService ["request_emp_rate_id"] = 0;
                executeService(jsonObjExecuteService, function(response_from_service) {
                    originalData = response_from_service;
                });

                function populateTable(tableId, data) {
                    var table = $(tableId)[0];
                    var tbody = table.getElementsByTagName('tbody')[0];
                    tbody.innerHTML = ''; // Clear existing rows
                    
                    if(approving_officer > 0){
                        var tableApprove = $('#appr_employee_rate_table')[0];
                        var tbodyApprove = tableApprove.getElementsByTagName('tbody')[0];
                        tbodyApprove.innerHTML = ''; // Clear existing rows
                    }

                    if (data.length !== 0) {
                        jsonObj = [];
                        for (let i = 0; i < data.length; i++) {
                            item = {};
                            item ["daily_paid"] = data[i].daily_paid;
                            item ["daily_rate"] = data[i].daily_rate;
                            item ["datetime_requested"] = data[i].datetime_requested;
                            item ["dependents_exemption"] = data[i].dependents_exemption;
                            item ["employee_id"] = data[i].employee_id;
                            item ["employee_name"] = data[i].employee_name;
                            item ["entitled_holiday"] = data[i].entitled_holiday;
                            item ["entitled_overtime"] = data[i].entitled_overtime;
                            item ["personal_exemption"] = data[i].personal_exemption;
                            item ["request_id"] = data[i].request_id;
                            item ["requested_by"] = data[i].requested_by;
                            item ["total_exemptions"] = data[i].total_exemptions;
                            item ["approved_by"] = data[i].approved_by;
                            item ["datetime_approved"] = data[i].datetime_approved;
                            item ["apporove_emp_rate"] = data[i].apporove_emp_rate;
                            jsonObj.push(item);
                           
                            var buttonApprove = ``;
                            if(approving_officer > 0){

                                let allApproved = true;
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].approved_by > 0) {
                                        allApproved = false;
                                        break;
                                    }
                                }
                                if (allApproved) {
                                    $('.no-available-data').remove();
                                    $('#appr_employee_rate_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                                } else {
                                    if (data[i].approved_by > 0) {
                                        const newRowApprove = document.createElement("tr");
                                        newRowApprove.innerHTML = `<td class="autoCaps">${data[i].employee_name}</td>
                                                                    <td class="autoCaps">${numberFormat(parseFloat(data[i].daily_rate))}</td>
                                                                    <td>
                                                                        <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                                    </td>`;
                                        tbodyApprove.appendChild(newRowApprove);
                                    }
                                }
                                buttonApprove = `<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#largeModal" onclick="approve(${i})">Approve</button>&nbsp;`;
                            }
                            var buttonsChange = ``;
                            if(data[i].requested_by == unique_application_user_id){
                                $('#btnSave,#btnCancel').show();
                                if(data[i].approved_by > 0){
                                    buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                }else{
                                    buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                    <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;
                                                    <button class="btn btn-outline-danger btn-sm fa fa-trash-o" data-toggle="modal" data-target="#largeModal" onclick="deleteData(${i})"></button>&nbsp;`;
                                }
                            }else{
                                $('#btnSave,#btnCancel').hide();
                                if(data[i].approved_by > 0){
                                    buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                                }else{
                                    buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                    ${buttonApprove}`;
                                }
                            }
                            let allApproved = true;
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].approved_by <= 0) {
                                    allApproved = false;
                                    break;
                                }
                            }
                            if (allApproved) {
                                $('.no-available-data').remove();
                                $(tableId).parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                            } else {
                                if (data[i].approved_by === 0) {
                                    const newRow = document.createElement("tr");
                                    newRow.innerHTML = `<td class="autoCaps">${data[i].employee_name}</td>
                                                        <td class="autoCaps">${numberFormat(parseFloat(data[i].daily_rate))}</td>
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
                        filterAndPopulateTable('#req_employee_rate_table');
                    }
                });
                document.getElementById('btnSearch').addEventListener('click', function() {
                    // Remove existing "No available data" labels
                    $('.no-available-data').remove();
                    filterAndPopulateTable('#req_employee_rate_table');
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
                        $('#appr_employee_rate_table').find('tbody').empty(); // Clear the table body
                        $('#appr_employee_rate_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
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
                        $('#appr_employee_rate_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                    }
                }
                filterAndPopulateTable('#req_employee_rate_table');
            }
                
        }, 500);
    };
    check_user_id();
});
function numberFormat(num) {
	return `${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
var autocompleteInstance = null;
document.getElementById('employee_description').addEventListener("keypress", function(e) {
    // If the user presses the "Enter" key on the keyboard
    $('#employee_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        populateDataDrp2($(this).val());
    }
});
function populateDataDrp2(item_type) {

    const jsonData = {
        procedure_name_given: 'getListOfEmployeeName',
        method_given: 'GET',
        module_given: 'EmployeeProfile-API',
        description: item_type
    };
    executeService(jsonData, function (response_from_service) {
        var arrInfo = response_from_service;
        // const emp_id_exist = $('#employee_id_append').val();
        // arrInfo = arrInfo.filter(item1 => !jsonObj.some(item2 => item2.employee_id === item1.employee_id && item1.employee_id !== parseInt(emp_id_exist)));
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
            }
        });
    }
}