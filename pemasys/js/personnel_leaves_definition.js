function noenter() {
    return !(window.event && window.event.keyCode == 13); 
}
function fetch_inputs(index) {
    $('#leave_id').val(jsonObj[index].leave_id);
    $('#description').val(jsonObj[index].description);
    $('#governMandated').prop('checked', jsonObj[index].govt_mandated === 1);
    $('#wpay').prop('checked', jsonObj[index].with_pay === 1);
    $('#monetize').prop('checked', jsonObj[index].can_be_monetized === 1);
    $('#min_hours').val(jsonObj[index].min_number_of_hours);
    $('#max_hours').val(jsonObj[index].max_number_of_hours);
    $('#employment_status_description').val(jsonObj[index].employment_status_description);
    $('#employment_type_description').val(jsonObj[index].employee_type_description);
    $('#dayb').val(jsonObj[index].request_days_before);
    $('#tenureM').val(jsonObj[index].tenure_in_months);
}
function viewData(index) {
	$('#largeModalLabel').text('View Personnel Leave Definition');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').attr('readOnly',true);
    $('#governMandated,#wpay,#monetize').attr('disabled',true);
    $('#btnSave,#btnCancel').hide();
}
function updateData(index) {
	$('#largeModalLabel').text('Update Personnel Leave Definition');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').removeAttr('readOnly',true);
    $('#governMandated,#wpay,#monetize').removeAttr('disabled',true);
    $('#btnSave,#btnCancel').show();
}
function addData(index) {
	$('#largeModalLabel').text('Update Personnel Leave Definition');
    $('#save-message,#delete-message').remove();
    $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').removeAttr('readOnly',true);
    $('#governMandated,#wpay,#monetize').removeAttr('disabled',true);
    $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').val('');
    $('#governMandated,#wpay,#monetize').prop('checked', false);
    $('#btnSave,#btnCancel').show();
}

function deleteData(index) {
	$('#largeModalLabel').text('Delete Personnel Leave Definition');
    $('#save-message,#delete-message').remove();
    const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    fetch_inputs(index);
    $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').attr('readOnly',true);
    $('#governMandated,#wpay,#monetize').attr('disabled',true);
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "deletePersonnelLeaveDefinition";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "DELETE"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["leave_id"] = jsonObj[index].leave_id;
            
            executeService(jsonObjExecuteService, function(response_from_service) {

                $('.div-loader').removeClass('loader-line');
                var success = response_from_service.success;
                if(success > 0){
                    $('.close').remove();
                    $('#message-form').prepend('<span id="continue-to-reload" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function(){
                        $('#largeModal').modal('hide');
                        $('#continue-to-reload').remove();
                        const tbody = document.querySelector("#personnel_definition tbody");
                        const rows = tbody.getElementsByTagName("tr");
                        tbody.removeChild(rows[index]);
                        allocateReturnId();
                    });
                }else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
                }
                $('#err-save-message-ok').click(function(){
                    deleteData(index);
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
                        jsonObjExecuteService ["procedure_name_given"] = "getPersonnelLeaveDefinition";  //given json element do not remove
                        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                        // here is to create jsonObject needed for procedure
                        jsonObjExecuteService ["leave_id"] = 0;

                        executeService(jsonObjExecuteService, function(response_from_service) {
                            originalData = response_from_service;
                            filterAndPopulateTable('#personnel_definition');
                            var storedEntryIdNumber = parseInt(entry_id);
                            var filteredLeaveData = originalData.filter(function(item) {
                                return item.leave_id === storedEntryIdNumber;
                            });
                            if (storedEntryIdNumber) {
                                $('.no-available-data').remove();
                                populateTable('#personnel_definition', filteredLeaveData);
                                $('#personnel_definition tbody tr').find('td').css('background-color', '#d6e3f0');
                            }

                            $('#description').on('keyup',function(){
                                $('#save-message').remove();
                                $('#btnSave').removeAttr('disabled',true);
                                for(var x = 0; x < response_from_service.length; x++) {
                                    const description = response_from_service[x].description;
                                    const lowercaseDescription = description ? description.toLowerCase() : 'N/A';
                                    if($('#leave_id').val() == 0){
                                        if ($(this).val().toLowerCase() === lowercaseDescription) {
                                            $('#save-message').remove();
                                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Leave Decription is already taken.');
                                            $('#btnSave').attr('disabled',true);
                                        }
                                    }else{
                                        if($(this).val().toLowerCase() === response_from_service[x].description.toLowerCase() && $('#leave_id').val() == response_from_service[x].leave_id){
                                            $('#save-message').remove();
                                        }else if($(this).val().toLowerCase() === response_from_service[x].description.toLowerCase()){
                                            $('#save-message').remove();
                                            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Leave Decription is already taken.');
                                            $('#btnSave').attr('disabled',true);
                                        }
                                    }
                                }
                            });
                        });

                        function populateTable(tableId, data) {
                                        
                            const table = document.querySelector(tableId);
                            const tbody = table.querySelector('tbody');
                            tbody.innerHTML = ''; // Clear existing rows
                        
                            if (data.length !== 0) {
                                jsonObj = [];
                                for (let i = 0; i < data.length; i++) {
                                    
                                    item = {};
                                    item ["leave_id"] = data[i].leave_id;
                                    item ["description"] = data[i].description;
                                    item ["govt_mandated"] = data[i].govt_mandated;
                                    item ["with_pay"] = data[i].with_pay;
                                    item ["min_number_of_hours"] = data[i].min_number_of_hours;
                                    item ["max_number_of_hours"] = data[i].max_number_of_hours;
                                    item ["employment_status_id"] = data[i].employment_status_id;
                                    item ["employment_status_description"] = data[i].employment_status_description;
                                    item ["request_days_before"] = data[i].request_days_before;
                                    item ["tenure_in_months"] = data[i].tenure_in_months;
                                    item ["can_be_monetized"] = data[i].can_be_monetized;
                                    item ["employee_type_id"] = data[i].employee_type_id;
                                    item ["employee_type_description"] = data[i].employee_type_description;
                                    item ["created_by"] = data[i].created_by;
                                    item ["datetime_created"] = data[i].datetime_created;
                                    item ["modified_by"] = data[i].modified_by;
                                    item ["datetime_modified"] = data[i].datetime_modified;
                                    jsonObj.push(item);

                                    const newRow = document.createElement('tr');
                                    newRow.innerHTML = `<td class="autoCaps">${data[i].description}</td>
                                                        <td>${data[i].min_number_of_hours}</td>
                                                        <td>${data[i].max_number_of_hours}</td>
                                                        <td>${data[i].employment_status_description}</td>
                                                        <td>${data[i].employee_type_description}</td>
                                                        <td>
                                                            <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                                            <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;
                                                            <button class="btn btn-outline-danger btn-sm fa fa-trash-o" data-toggle="modal" data-target="#largeModal" onclick="deleteData(${i})"></button>&nbsp;
                                                        </td>`;
                                    tbody.appendChild(newRow);
                                }
                            }
                        }

                        document.getElementById('searchname').addEventListener("keyup", function() {
                            if (event.key == "Enter") {
                                // Remove existing "No available data" labels
                                sessionStorage.removeItem("entry_id");
                                $('.no-available-data').remove();
                                filterAndPopulateTable('#personnel_definition');
                            }
                        });
                        
                        document.getElementById('btnSearch').addEventListener('click', function() {
                            // Remove existing "No available data" labels
                            sessionStorage.removeItem("entry_id");
                            $('.no-available-data').remove();
                            filterAndPopulateTable('#personnel_definition');
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
                                return; // Exit the function if the search query is empty
                            }
                        
                            // Flag to check if any rows match the search query
                            var hasMatchingRows = false;
                        
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
                            }
                        }
                    }
                
                }, 500);
        };
        check_user_id();
    }
});
var autocompleteInstance = null;
$('#employment_status_description').keypress(function(event) {
    // If the user presses the "Enter" key on the keyboard
    $('#employment_status_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if($(this).val() !== ""){
            employmentStatusDrop($(this).val());
        }
    }
});
function employmentStatusDrop(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getEmploymentStatus";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["bol_getone"] = 0;
    jsonObjExecuteService ["status_id"] = 0;
    jsonObjExecuteService ["bol_inactive"] = 0;
    jsonObjExecuteService ["description"] = "";
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('employment_status_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#employment_status_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#employment_status_id').val(e.status_id);
            }
        });
    }
}
$('#employment_type_description').keypress(function(event) {
    // If the user presses the "Enter" key on the keyboard
    $('#employee_type_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if($(this).val() !== ""){
            employeeTypeDrop($(this).val());
        }
    }
});
function employeeTypeDrop(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getEmployeeType";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["type_id"] = 0;
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('employment_type_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#employment_type_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#employee_type_id').val(e.type_id);
            }
        });
    }
}