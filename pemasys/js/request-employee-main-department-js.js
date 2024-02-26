$(document).ready(function(){
    jsonObj = [];
    $('#req_emp_dep_table,#appr_emp_dep_table').parent().append('<label id="forNoDataReq" class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Quick Note: Kindly search before checking table values. Thanks!</label>');
    $('#req_emp_dep_table,#appr_emp_dep_table').children('tbody').children('tr').remove();
    document.getElementById('searchname').addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        var storedID = localStorage.getItem('lastID');
        if (!storedID) {
          jsonObj = [];
        }
        $('#forNoDataReq,#forNoDataAppr').empty();
        $('.no-available-data').remove();
        e.preventDefault();
        populateMainDepartment(e.target.value,0);
      }
    });
    var storedID = localStorage.getItem('lastID');
    if (storedID) {
      populateMainDepartment("",storedID); 
      $('.no-available-data').remove();
      localStorage.removeItem('lastID');
    }
    
    function populateMainDepartment(reference, last_id) {
      const jsonData = {
        procedure_name_given : 'getRequestEmpMainDepartment',
        method_given : 'GET',
        module_given : 'EmployeeProfile-API',
        description : reference,
        last_id : last_id
      };
      executeService(jsonData, function(response_from_service) {
          populateRequestEmpDepartment(response_from_service);
      });
    
    }
    function populateRequestEmpDepartment(response) {

        // REQUEST
        $('#req_emp_dep_table').parent().append('<label id="forNoDataReq" class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
        const parentDivReq = document.getElementById("req_emp_dep_table");
        const tbodyReq = parentDivReq.querySelector('tbody');
        $("#req_emp_dep_table").children("tbody").children('tr').remove();

        if(approving_officer > 0){
          $('#appr_emp_dep_table').parent().append('<label id="forNoDataAppr" class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
        }

        function tbody_tr_td() {

          if(approving_officer > 0){
            // APPROVED

            const parentDivAppr = document.getElementById("appr_emp_dep_table");
            const tbodyAppr = parentDivAppr.querySelector('tbody');
            $("#appr_emp_dep_table").children("tbody").children('tr').remove();

            const latestApprovedRecords = {};
        
            // Iterate through the response to find the latest approved records
            for (let i = 0; i < response.length; i++) {
                if (response[i].approved === 1) {
                    const employeeId = response[i].employee_id;
        
                    // Check if there is no record for this employee or this record is more recent based on request_id or datetime_requested
                    if (
                        !latestApprovedRecords[employeeId] ||
                        response[i].request_id > latestApprovedRecords[employeeId].request_id ||
                        response[i].datetime_requested > latestApprovedRecords[employeeId].datetime_requested
                    ) {
                        latestApprovedRecords[employeeId] = response[i];
                    }
                }
            }
        
            // Clear the "APPROVED" table
            tbodyAppr.innerHTML = "";
        
            // Iterate through the latest approved records and display them in the "APPROVED" table
            for (const employeeId in latestApprovedRecords) {
              $('#forNoDataAppr').remove();
                const record = latestApprovedRecords[employeeId];
                const newRow = document.createElement("tr");
                newRow.innerHTML = `<td class="autoCaps">${record.employee_name}</td>
                                    <td class="autoCaps">${record.department_name}</td>`;
                tbodyAppr.appendChild(newRow);
            }
          }
      
          // Now, let's populate the "REQUEST" table with all records
          tbodyReq.innerHTML = "";
      
          for (let i = 0; i < response.length; i++) {
              if (response[i].approved === 0) {
                $('#forNoDataReq').remove();
                if(response[i].requested_by == unique_application_user_id){
                  const newRow = document.createElement("tr");
                  newRow.innerHTML = `<td class="autoCaps">${response[i].employee_name}</td>
                                      <td class="autoCaps">${response[i].department_name}</td>
                                      <td>
                                          <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                          <button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" data-target="#largeModal" onclick="updateData(${i})"></button>&nbsp;
                                          <button class="btn btn-outline-danger btn-sm fa fa-trash-o" data-toggle="modal" data-target="#largeModal" onclick="deleteData(${i})"></button>&nbsp;
                                      </td>`;
                  tbodyReq.appendChild(newRow);
                }else{
                  if(approving_officer > 0){
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `<td class="autoCaps">${response[i].employee_name}</td>
                                        <td class="autoCaps">${response[i].department_name}</td>
                                        <td>
                                            <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                            <button class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#largeModal" onclick="approve(${i})">Approve</button>&nbsp;
                                        </td>`;
                    tbodyReq.appendChild(newRow);
                  }else{
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `<td class="autoCaps">${response[i].employee_name}</td>
                                        <td class="autoCaps">${response[i].department_name}</td>
                                        <td>
                                            <button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" data-target="#largeModal" onclick="viewData(${i})"></button>&nbsp;
                                        </td>`;
                    tbodyReq.appendChild(newRow);
                  }
                }
              }
          }
        }

        if(jsonObj.length == 0) {
          for(var i = 0; i < response.length; i++) {
            if (typeof response[i].request_id !== "undefined" ) {
  
              item = {};
              item["request_id"] = response[i].request_id;
              item["employee_id"] = response[i].employee_id;
              item["department_id"] = response[i].department_id;
              item["requested_by"] = response[i].requested_by;
              item["approved"] = response[i].approved;
              item["employee_name"] = response[i].employee_name;
              item["department_name"] = response[i].department_name;
              
              jsonObj.push(item);
              tbody_tr_td();
             
            } else {
              tbody_tr_td()
              $('#forNoDataReq,#forNoDataAppr').remove();
              $('.no-available-data').remove();
              $('#req_emp_dep_table,#appr_emp_dep_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
            }
          }
        }else {
          for(var i = 0; i < response.length; i++) {
            if (typeof response[i].request_id !== "undefined" ) {
              tbody_tr_td();
            }else{
              $('.no-available-data').remove();
              $('#req_emp_dep_table,#appr_emp_dep_table').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
            }
          }
        }
        //show total entries in badge
        var tr_length = $('#req_emp_dep_table,#appr_emp_dep_table').children('tbody').children('tr').length;
        $('.card-title').children().children('span').text(tr_length);
        //console.log(jsonObj);
    }
});


// Reset the modal
function resetModal() {
  $('#myForm')[0].reset(); // Reset the form
  $('#myForm input').prop("disabled", false); // Enable all inputs within the form
  $('#myForm input').removeClass('is-invalid is-valid'); // Remove 'is-invalid' and 'is-valid' classes from all inputs
  $('#btnSave, #btnCancel').show(); // Show the "Save" and "Cancel" buttons
  $('#message-form').empty(); // Clear the message-form div content
}

// Event handler for when the modal is hidden
$('#largeModal').on('hidden.bs.modal', function (e) {
  resetModal();
});

// Function to add data
function addData() {
  resetModal();
  $('#largeModalLabel').html('Add Request Employee Department');
  $('#entry_id, #employee_id, #department_id').val(0);
  $('#employee-name, #department').prop('readonly', false);
  $('#btnSave, #btnCancel').show();
}

// Function to populate inputs from your data source (e.g., jsonObj)
function fetch_inputs(index) {
  $('#entry_id').val(jsonObj[index].request_id);
  $('#employee_id').val(jsonObj[index].employee_id);
  $('#department_id').val(jsonObj[index].department_id);
  $('#employee-name').val(jsonObj[index].employee_name);
  $('#department').val(jsonObj[index].department_name);
}

// Function to view data
function viewData(index) {
  resetModal();
  $('#largeModalLabel').text('View Request Employee Department');
  fetch_inputs(index);
  $('#employee-name, #department').prop('readonly', true);
  $('#btnSave, #btnCancel').hide();
}
// Function to view approved data
function viewDataApproved(index) {
  resetModal();
  $('#largeModalLabel').text('View Approved Employee Department');
  fetch_inputs(index);
  $('#employee-name, #department').prop('readonly', true);
  $('#btnSave, #btnCancel').hide();
}

// Function to update data
function updateData(index) {
  resetModal();
  $('#largeModalLabel').text('Update Request Employee Department');
  fetch_inputs(index);
  $('#employee-name, #department').prop('readonly', false);
}

//DELETE DATA
function deleteData(index) {
  resetModal();
  $('#btnSave, #btnCancel').hide();
  $('#largeModalLabel').text('Delete Request Employee Department');
  fetch_inputs(index);
  $('#employee-name, #department').attr('disabled',true);
  const parentDiv = document.getElementById("message-form");
  parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">delete</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
        $('#delete-message-yes').click(function(){
        $('#delete-message').remove();
        $('.div-loader').addClass('loader-line');

        const jsonData = {
            procedure_name_given : 'deleteRequestEmployeeDepartment',
            method_given : 'DELETE',
            module_given : 'EmployeeProfile-API',
            request_id : jsonObj[index].request_id
          };
          //console.log(jsonData);
        executeService(jsonData, function(response_from_service) {
        setTimeout(function(){
          $('.div-loader').removeClass('loader-line');
          var success = response_from_service.success;

          if(success > 0){
            $('.close, #modal-cancel-btn').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
            $('#btnCancel').hide();
            $('#continue-to-reload').click(function(){
              setTimeout(function(){
                location.reload();
              },200);
            });
          }else {
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
              $('#btnCancel').hide();
          }

          $('#err-save-message-ok').click(function(){
            setTimeout(function(){
              location.reload();
            },200);
          });
          },1200);
        });
    });
}
//APPROVE DATA
function approve(index) {
  resetModal();
  $('#btnSave, #btnCancel').hide();
  $('#largeModalLabel').text('Approve Request Employee Department');
fetch_inputs(index);
  $('#employee-name, #department').attr('disabled',true);
  const parentDiv = document.getElementById("message-form");
  parentDiv.innerHTML = `<span id="delete-message" class="control-label mb-1">
                            <small class="is-highlight">Are you sure you want to <span class="text-bold">Approve</span> this data?
                            <span id="delete-message-yes" class="pull-right message-ok">Yes</span>
                          </small><br>
                        </span>`;
        $('#delete-message-yes').click(function(){
          
          $('#delete-message').remove();
          $('.div-loader').addClass('loader-line');

          const jsonData = {
            procedure_name_given : 'postJSONApproveEmpMainDep',
            method_given : 'POST',
            module_given : 'EmployeeProfile-API',
            request_id : jsonObj[index].request_id,
            employee_id : jsonObj[index].employee_id,
            department_id : jsonObj[index].department_id,
            user_id : unique_application_user_id,
            approved : 1
        };
          executeService(jsonData, function(response_from_service) {
          setTimeout(function(){
            $('.div-loader').removeClass('loader-line');
            var success = response_from_service.success;

            if(success > 0){
              $('.close, #modal-cancel-btn').remove();
              localStorage.setItem('lastID', response_from_service.last_id);
              $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
              $('#btnCancel').hide();
              $('#continue-to-reload').click(function(){
                setTimeout(function(){
                  location.reload();
                },200);
              });
            }else {
              $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
              $('#btnCancel').hide();
            }

            $('#err-save-message-ok').click(function(){
              setTimeout(function(){
                location.reload();
              },200);
            });
          },1200);
        });
    });
}

//SAVING DATA
$(document).ready(function(){
    function validationAttr() {
        $('#employee-name, #department').prop("disabled", true);
    }

    function validationRemoveAttr() {
        $('#employee-name, #department').prop("disabled", false);
    }
    $("#btnSave").click(function(){
        var request_id = $('#entry_id').val();
        var employee_id = $('#employee_id').val();
        var department_id = $('#department_id').val();
        var employee = $('#employee-name').val();
        var department = $('#department').val();
        var user_id = unique_application_user_id;

        //VALDIATION
        $('#employee-name, #department').removeClass('is-invalid');
        if (!employee_id || !department_id || !employee || !department) {
          if (!employee_id) {
            $('#employee-name').addClass('is-invalid');
          }else{
            $('#employee-name').addClass('is-valid');
          }
          if (!department_id) {
            $('#department').addClass('is-invalid');
          }else{
            $('#department').addClass('is-valid');
          }
          if (!employee) {
            $('#employee-name').addClass('is-invalid');
          }else{
            $('#employee-name').addClass('is-valid');
          }
          if (!department) {
            $('#department').addClass('is-invalid');
          }else{
            $('#department').addClass('is-valid');
          }
          return;
        }

        const jsonData = {
            procedure_name_given : 'postJSONRequestEmpMainDep',
            method_given : 'POST',
            module_given : 'EmployeeProfile-API',
            request_id : request_id,
            employee_id : employee_id,
            department_id : department_id,
            user_id : user_id
        };
        //console.log(jsonData);
        if(isJSONValid(jsonData)) {
            $('#btnCancel, #btnSave').hide();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">save</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');
            
            validationAttr();

            //BUTTON NO
            $('#save-message-no-ok').click(function(){
                $('#save-message, #err-save-message').remove();
                $('#btnCancel, #btnSave').show();
                validationRemoveAttr();
            });

            //BUTTON YES
            $('#save-message-ok').click(function(){
                $('#save-message').remove();
                $('.div-loader').addClass('loader-line');
                executeService(jsonData, function(response_from_service) {
                    //console.log(response_from_service);
                    setTimeout(function(){
                    $('.div-loader').removeClass('loader-line');
                    var success = response_from_service.success;

                    if(success > 0){
                        $('.close, #btnCancel').remove();
                        localStorage.setItem('lastID', response_from_service.last_id);
                        $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
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
                    },1200);
                });
            });
            }else {
            $('#message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
            }
            $('#err-save-message-ok').click(function(){
            setTimeout(function(){
                location.reload();
            },200);
            });
    });
    function isJSONValid(jsonData) {
        try {
            JSON.stringify(jsonData);
            return true;
        } catch (error) {
            return false;
        }
    }
});