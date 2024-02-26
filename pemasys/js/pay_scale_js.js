function fetch_inputs(index) {
    $('#scale_id').val(jsonObj[index].scale_id);
    $('#description').val(jsonObj[index].description);
    $('#min_daily_rate').val(numberFormat(jsonObj[index].min_daily_rate));
    $('#max_daily_rate').val(numberFormat(jsonObj[index].max_daily_rate));
}
function viewData(index) {
	$('#largeModalLabel').text('View Pay Scale');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#scale_id,#description,#min_daily_rate,#max_daily_rate').attr('readOnly',true);
    $('#btnSave,#btnCancel').hide(); 
}
function updateData(index) {
	$('#largeModalLabel').text('Update Pay Scale');
    $('#save-message,#delete-message').remove();
    fetch_inputs(index);
    $('#scale_id,#description,#min_daily_rate,#max_daily_rate').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show(); 
    $('#btnSave').removeAttr('disabled',true); 
}
function addData(index) {
    $('#scale_id').val(0);
    $('#description,#min_daily_rate,#max_daily_rate').val('');
	$('#largeModalLabel').text('Add Pay Scale');
    $('#save-message,#delete-message').remove();
    $('#scale_id,#description,#min_daily_rate,#max_daily_rate').removeAttr('readOnly',true);
    $('#btnSave,#btnCancel').show();
    $('#btnSave').removeAttr('disabled',true); 
}
function deleteData(index) {
	$('#largeModalLabel').text('Delete Pay Scale');
	const parentDiv = document.getElementById("message-form");
	parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
    $('#scale_id,#description,#min_daily_rate,#max_daily_rate').attr('readOnly',true);
    fetch_inputs(index);
    
    $('#delete-message-yes').click(function(){
        $('#btnCancel').hide();
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        setTimeout(function(){
            jsonObjExecuteService = {};
            jsonObjExecuteService ["procedure_name_given"] = "deletePayScale";  //given json element do not remove
            jsonObjExecuteService ["method_given"] = "DELETE"; //given json element do not remove
            jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
            // here is to create jsonObject needed for procedure
            jsonObjExecuteService ["scale_id"] = jsonObj[index].scale_id;
            
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
                    jsonObjExecuteService ["procedure_name_given"] = "getPayScale";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["scale_id"] = 0;

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
                                item ["scale_id"] = data[i].scale_id;
                                item ["description"] = data[i].description;
                                item ["min_daily_rate"] = data[i].min_daily_rate;
                                item ["max_daily_rate"] = data[i].max_daily_rate;
                                item ["min_hour_rate"] = data[i].min_hour_rate;
                                item ["max_hour_rate"] = data[i].max_hour_rate;
                                item ["datetime_created"] = data[i].datetime_created;
                                item ["created_by"] = data[i].created_by;
                                jsonObj.push(item);

                                const newRow = document.createElement('tr');
                                newRow.innerHTML = `<td class="autoCaps">${data[i].description}</td>
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
                            filterAndPopulateTable('#pay_scale_table');
                        }
                    });
                    
                    document.getElementById('btnSearch').addEventListener('click', function() {
                        // Remove existing "No available data" labels
                        $('.no-available-data').remove();
                        filterAndPopulateTable('#pay_scale_table');
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
                    filterAndPopulateTable('#pay_scale_table');
                }
            
            }, 500);
    };
    check_user_id();
});
function numberFormat(num) {
	return `${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}