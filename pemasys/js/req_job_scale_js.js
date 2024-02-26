function fetch_inputs(index) {
    $('#request_id').val(jsonObj[index].request_id);
    $('#job_id').val(jsonObj[index].job_id);
    $('#job_id_append').val(jsonObj[index].job_id);
    $('#job_reference_descrip').val(jsonObj[index].job_description);
    $('#scaled_id').val(jsonObj[index].scaled_id);
    $('#pay_scale_descrip').val(jsonObj[index].scaled_description);
}
function viewData(index) {
	$('#largeModalLabel').text('View Request Job Scale');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#job_reference_descrip,#pay_scale_descrip').attr('readOnly',true);
    $('#btnSave,#btnCancel').hide(); 
}
function updateData(index) {
	$('#largeModalLabel').text('Update Request Job Scale');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#job_reference_descrip,#pay_scale_descrip').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show();
    $('#btnSave').removeAttr('disabled',true);
}
function addData() {
    $('#request_id,#job_id,#scaled_id,#job_id_append').val(0);
    $('#job_reference_descrip,#pay_scale_descrip').val('');
	$('#largeModalLabel').text('Add Job Scale');
    $('#save-message,#delete-message').remove();
    $('#job_reference_descrip,#pay_scale_descrip').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show();
    $('#btnSave').removeAttr('disabled',true);
}
function approve(index) {
	$('#largeModalLabel').text('Approve Request Job Scale');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    $('#job_reference_descrip,#pay_scale_descrip').attr('readOnly',true);
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "ApproveReqJobScale";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
            jsonObjExecuteService ["job_id"] = jsonObj[index].job_id;
            jsonObjExecuteService ["scale_id"] = jsonObj[index].scaled_id;
            jsonObjExecuteService ["requested_by"] = jsonObj[index].requested_by;
            jsonObjExecuteService ["approve_by"] = 1;
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
	$('#largeModalLabel').text('Delete Request Job Scale');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
                        $('#job_reference_descrip,#pay_scale_descrip').attr('readOnly',true);
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "deleteReqJobScale";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "DELETE"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["request_id"] = jsonObj[index].request_id;
            
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
    jsonObj = [];
    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getRequestPayScale";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["scale_req_id"] = 0;

    executeService(jsonObjExecuteService, function(response_from_service) {
        originalData = response_from_service;
    });

    function populateTable(tableId, data) {
        var table = $(tableId)[0];
        var tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Clear existing rows
    
        if(approving_officer > 0){
            var tableApprove = $('#appr_job_scale_table')[0];
            var tbodyApprove = tableApprove.getElementsByTagName('tbody')[0];
            tbodyApprove.innerHTML = ''; // Clear existing rows
        }

        if (data.length !== 0) {
            jsonObj = [];
            for (let i = 0; i < data.length; i++) {
                item = {};
                item ["request_id"] = data[i].request_id;
                item ["scaled_id"] = data[i].scaled_id;
                item ["scaled_description"] = data[i].scaled_description;
                item ["job_id"] = data[i].job_id;
                item ["job_description"] = data[i].job_description;
                item ["datetime_requested"] = data[i].datetime_requested;
                item ["datetime_created"] = data[i].datetime_created;
                item ["requested_by"] = data[i].requested_by;
                item ["approved"] = data[i].approved;
                item ["approved_by"] = data[i].approved_by;
                item ["apporove_pay_scale"] = data[i].apporove_pay_scale;
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
                        $('#appr_job_scale_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
                    } else {
                        if (data[i].approved > 0 && data[i].apporove_pay_scale != null) {
                            const newRowApprove = document.createElement("tr");
                            newRowApprove.innerHTML = `<td class="autoCaps">${data[i].job_description}</td>
                                                        <td class="autoCaps">${data[i].scaled_description}</td>
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
                    if(data[i].approved === 1){
                        buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;`;
                    }else{
                        buttonsChange = `<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                        <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;
                                        <button class="btn btn-outline-danger btn-sm fa fa-trash-o" data-toggle="modal" data-target="#largeModal" onclick="deleteData(${i})"></button>&nbsp;`;
                    }
                }else{
                    $('#btnSave,#btnCancel').hide();
                    if(data[i].approved === 1){
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
                        newRow.innerHTML =`<td class="autoCaps">${data[i].job_description}</td>
                                            <td class="autoCaps">${data[i].scaled_description}</td>
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
            filterAndPopulateTable('#req_job_scale_table');
        }
    });
    document.getElementById('btnSearch').addEventListener('click', function() {
        // Remove existing "No available data" labels
        $('.no-available-data').remove();
        filterAndPopulateTable('#req_job_scale_table');
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
            $('#appr_job_scale_table').find('tbody').empty(); // Clear the table body
            $('#appr_job_scale_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Notice: Please Search Before Viewing Table Values.</label>');
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
            $('#appr_job_scale_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
        }
    }
    filterAndPopulateTable('#req_job_scale_table');
});
var autocompleteInstance = null;
document.getElementById('job_reference_descrip').addEventListener("keypress", function(e) {
    // If the user presses the "Enter" key on the keyboard
    $('#job_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        populateDataDrp($(this).val());
    }
});
document.getElementById('pay_scale_descrip').addEventListener("keypress", function(e) {
    // If the user presses the "Enter" key on the keyboard
    $('#scaled_id').val(0);
    if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        populateDataDrp2($(this).val());
    }
});
function populateDataDrp(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getJobReference";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["reference_id"] = 0;
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        // const job_id_exist = $('#job_id_append').val();
        // arrInfo = arrInfo.filter(item1 => !jsonObj.some(item2 => item2.job_id === item1.reference_id && item1.reference_id !== parseInt(job_id_exist)));
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('job_reference_descrip').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#job_reference_descrip").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#job_id').val(e.reference_id);
            }
        });
    }
}
function populateDataDrp2(item_type) {

    jsonObjExecuteService = {};
    jsonObjExecuteService ["procedure_name_given"] = "getPayScale";  //given json element do not remove
    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
    // here is to create jsonObject needed for procedure
    jsonObjExecuteService ["scale_id"] = 0;
    
    executeService(jsonObjExecuteService, function(response_from_service) {
        var arrInfo = response_from_service;
        // arrInfo = arrInfo.filter(item1 => !jsonObj.some(item2 => item2.scaled_id === item1.scale_id));
        for(var i = 0; i < arrInfo.length; i++) {
            arrInfo[i].label = arrInfo[i].description;
        }
        initializeItemType(arrInfo);
        document.getElementById('pay_scale_descrip').dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    });
    function initializeItemType(sourceArray) {
        if (autocompleteInstance) {
            autocompleteInstance.autocomplete("destroy");
        }
        
        autocompleteInstance = $("#pay_scale_descrip").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 5,
            select: function (event, ui) {
                var e = ui.item;
                $('#scaled_id').val(e.scale_id);
            }
        });
    }
}
