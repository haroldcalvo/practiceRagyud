function addData(index) {
    $('#reference_id,#employee_type_id,#employee_education_id').val(0);
    $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').val('');
	$('#largeModalLabel').text('Add Job Reference');
    $('#save-message,#delete-message').remove();
    $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show();
    $('.remove_check').prop('checked',false);
    $('.remove_check').removeAttr('disabled',true);
    $('#btnSave').removeAttr('disabled',true);
}
function fetch_inputs(index) {
    $('#reference_id').val(jsonObj[index].reference_id);
    $('#job_description').val(jsonObj[index].description);
    $('#employee_type_id').val(jsonObj[index].type_id);
    $('#employee_type_description').val(jsonObj[index].type_description);
    $('#employee_education_id').val(jsonObj[index].education_id);
    $('#employee_education_description').val(jsonObj[index].education_description);
    $('#qualifications').val(jsonObj[index].qualifications);
    $('#work_experiences').val(jsonObj[index].work_experiences);
    $('#duties_and_responsibilities').val(jsonObj[index].duties_and_responsibilities);
    const department_pack = jsonObj[index].department_pack;
    if(department_pack != null){
        for(var i = 0; i < department_pack.length; i++) {
            $('.department_id_'+department_pack[i].department_id).prop('checked',true);
        } 
    }
    
}
function viewData(index) {
	$('#largeModalLabel').text('View Job Reference');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('.remove_check').attr('disabled',true);
    $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').attr('readOnly',true);
    $('#btnSave,#btnCancel').hide(); 
}
function updateData(index) {
	$('#largeModalLabel').text('Update Job Reference');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('.remove_check').removeAttr('disabled',true);
    $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show(); 
    $('#btnSave').removeAttr('disabled',true);
}
function deleteData(index) {
	$('#largeModalLabel').text('Delete Job Reference');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').attr('readOnly',true);
    $('.remove_check').attr('disabled',true);
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "deleteJobReference";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "DELETE"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["reference_id"] = jsonObj[index].reference_id;
            
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

    let check_user_id = function() {
        setTimeout(function() {
            if (unique_application_user_id == 0 && typeof unique_application_user_id === undefined) {
                check_user_id();
                }else {

                        jsonObjExecuteService = {};
                        jsonObjExecuteService ["procedure_name_given"] = "getMainDepartmentList";  //given json element do not remove
                        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                        // here is to create jsonObject needed for procedure
                        jsonObjExecuteService ["description"] = "";

                        executeService(jsonObjExecuteService, function(response_from_service) {
                            response_from_service = response_from_service.filter((item, index, self) => index === self.findIndex((t) => t.department_id === item.department_id) );
                            if(response_from_service.length !== undefined){
                                for(var i = 0; i < response_from_service.length; i++) {
                                    var appendData = `<div class="col bundle_append col-md-6">
                                                        <input type="checkbox" autocomplete="off" name="department_pack[]" value="${response_from_service[i].department_id}" class="form-group remove_check department_id_${response_from_service[i].department_id}">
                                                        <span>&nbsp;${response_from_service[i].description}</span>
                                                    </div>`;
                                    $('#deparment_checkbox').append(appendData);
                                }
                            }
                        });

                        jsonObj = [];
                        jsonObjExecuteService = {};
                        jsonObjExecuteService ["procedure_name_given"] = "getJobReference";  //given json element do not remove
                        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                        // here is to create jsonObject needed for procedure
                        jsonObjExecuteService ["reference_id"] = 0;

                        executeService(jsonObjExecuteService, function(response_from_service) {
                            originalData = response_from_service;
                        });

                        function populateTable(tableId, data) {
                                        
                            const table = document.querySelector(tableId);
                            const tbody = table.querySelector('tbody');
                            tbody.innerHTML = ''; // Clear existing rows
                        
                            if (data.length !== 0) {
                                jsonObj = [];
                                for (let i = 0; i < data.length; i++) {
                                    item = {};
                                    item ["reference_id"] = data[i].reference_id;
                                    item ["description"] = data[i].description;
                                    item ["type_id"] = data[i].type_id;
                                    item ["type_description"] = data[i].type_description;
                                    item ["education_id"] = data[i].education_id;
                                    item ["education_description"] = data[i].education_description;
                                    item ["qualifications"] = data[i].qualifications;
                                    item ["work_experiences"] = data[i].work_experiences;
                                    item ["duties_and_responsibilities"] = data[i].duties_and_responsibilities;
                                    item ["created_by"] = data[i].created_by;
                                    item ["datetime_created"] = data[i].datetime_created;
                                    item ["department_pack"] = data[i].department_pack;
                                    jsonObj.push(item);

                                    const newRow = document.createElement('tr');
                                    newRow.innerHTML = `<td class="autoCaps">${data[i].description}</td>
                                                        <td>${data[i].type_description}</td>
                                                        <td>${data[i].education_description}</td>
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
                                $('.no-available-data').remove();
                                filterAndPopulateTable('#job_reference_table');
                            }
                        });
                        
                        document.getElementById('btnSearch').addEventListener('click', function() {
                            // Remove existing "No available data" labels
                            $('.no-available-data').remove();
                            filterAndPopulateTable('#job_reference_table');
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
                        filterAndPopulateTable('#job_reference_table');
                    }
            
                }, 500);
        };
        check_user_id();
});

var autocompleteInstance = null;
document.getElementById('employee_education_description').addEventListener("keypress", function(e) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        populateDataDrp($(this).val());
    }
});
document.getElementById('employee_type_description').addEventListener("keypress", function(e) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        populateDataDrp2($(this).val());
    }
});
function populateDataDrp(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getEducationalLevel";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["bol_getone"] = 0;
    jsonObjExecuteService ["education_id"] = 0;
    jsonObjExecuteService ["description"] = "";
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('employee_education_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#employee_education_description").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#employee_education_id').val(e.education_id);
            }
        });
    }
}
function populateDataDrp2(item_type) {

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
        document.getElementById('employee_type_description').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#employee_type_description").autocomplete({
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