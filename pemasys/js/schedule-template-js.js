$(document).ready(function(){
    jsonObj = [];
    $('#schedule-template').parent().append('<label id="noData" class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">🔍 Quick Note: Kindly search before checking table values. Thanks!</label>');
    $('#schedule-template').children('tbody').children('tr').remove();
    document.getElementById('searchname').addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        $('#noData').empty();
        $('.no-available-data').remove();
          e.preventDefault();
          populateTemplates(e.target.value);
      }
    });
    function populateTemplates(reference) {
      const jsonData = {
        procedure_name_given : 'getScheduleTemplateList',
        method_given : 'GET',
        module_given : 'EmployeeProfile-API',
        description : reference
      };
      executeService(jsonData, function(response_from_service) {
          populateScheduleTemplate(response_from_service);
      });
    }
  
    function populateScheduleTemplate(response) {
  
        const parentDiv = document.getElementById("schedule-template");
        const tbody = parentDiv.querySelector('tbody');
        $('#schedule-template').children('tbody').children('tr').remove();
  
        
        function tbody_tr_td() {
  
          var add_update = ``;
          if (response[i].validation > 0) {
            add_update = `<button class="btn btn-outline-primary btn-sm updateButton">Update Work Schedule</button>&nbsp;`;
          } else {
            add_update = `<button class="btn btn-outline-primary btn-sm addButton">Add Work Schedule</button>&nbsp;`;
          }
  
          const newRow = document.createElement("tr");
          newRow.innerHTML = `<td class="autoCaps">${response[i].description}</td>
                              <td>${response[i].break_allowance}</td>
                              <td>${response[i].minimum_minutes_required_rendered_overtime}</td>
                              <td>
                                ${add_update}
                                <button class="btn btn-outline-success btn-sm fa fa-edit"></button>&nbsp;
                                <button class="btn btn-outline-danger btn-sm fa fa-trash-o"></button>&nbsp;
                              </td>
                          `;
          tbody.appendChild(newRow);
        }
        if(jsonObj.length == 0) {
          for(var i = 0; i < response.length; i++) {
            if (typeof response[i].template_id !== "undefined" ) {

                item = {};
                item["template_id"] = response[i].template_id;
                item["description"] = response[i].description;
                item["break_allowance"] = response[i].break_allowance;
                item["minimum_minutes_required_rendered_overtime"] = response[i].minimum_minutes_required_rendered_overtime;
                
                jsonObj.push(item);
                tbody_tr_td();
            } else {
              $('#schedule-template').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
            }
          }
        }else {
          for(var i = 0; i < response.length; i++) {
            if(typeof response[i].template_id !== "undefined"){
              tbody_tr_td();
            }else{
              $('#schedule-template').parent().append('<label class="no-available-data control-label mb-1" style="padding-bottom:15px;padding-top:15px;text-align:center;display: block;">No available data</label>');
            }
          }
        }
        var tr_length = $('#schedule-template').children('tbody').children('tr').length;
        $('.card-title').children().children('span').text(tr_length);
    }
  });

  $(document).ready(function(){
    // RESET MODAL
  function resetModal() {
    $('#myForm')[0].reset(); // Reset the form fields
    $('#description, #breakAllowance, #minimumOvertime').prop("disabled", false);
    $('#btnSave').show();
    $('#btnCancel').show();
    $('#btnSave').prop("disabled", false);
    $('#message-form').empty(); // Clear the message-form div content

     // Reset the hidden input field
    $('#entry_id').val(0);
  }

    $('#largeModal').on('hidden.bs.modal', function(e) {
    resetModal();
    }); 
    //FOR ADD
    $(document).on('click', '#add', function() {
        resetModal();
        $('#largeModalLabel').html('Add Schedule Template');
        $('#entry_id').val(0);
    });
    //FOR UPDATE
  $(document).on('click', '.fa-edit', function() {
    resetModal();
    var rowIndex = $(this).closest('tr').index();
    var data = jsonObj[rowIndex];
    var updateScheduleTemplate = data.template_id;
    if(updateScheduleTemplate != 0){
        $('#largeModalLabel').html('Update Schedule Template');
    }
    $('#entry_id').val(data.template_id);
    $('#description').val(data.description);
    $('#breakAllowance').val(data.break_allowance);
    $('#minimumOvertime').val(data.minimum_minutes_required_rendered_overtime);

    $('#largeModal').modal('show');
  });
  // FOR DELETE
  $(document).on('click', '.fa-trash-o', function() {
    resetModal();
      var rowIndex = $(this).closest('tr').index();
      var data = jsonObj[rowIndex];
      var deleteScheduleTemplate = data.template_id;
      if(deleteScheduleTemplate != 0){
          $('#largeModalLabel').html('Delete Schedule Template');
      }
      $('#entry_id').val(data.template_id);
      $('#description').val(data.description);
      $('#breakAllowance').val(data.break_allowance);
      $('#minimumOvertime').val(data.minimum_minutes_required_rendered_overtime);

      $('#largeModal').modal('show');

      $('#btnSave').hide();
      $('#description, #breakAllowance, #minimumOvertime').attr('disabled',true);
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
                procedure_name_given : 'deleteScheduleTemplates',
                method_given : 'DELETE',
                module_given : 'EmployeeProfile-API',
                template_id : deleteScheduleTemplate
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
  });
});
  //SAVING DATA
   $(document).ready(function(){
    function validationAttr() {
      $('#description , #breakAllowance, #minimumOvertime, #btnSave').prop('disabled',true);
    }

    function validationRemoveAttr() {
       $('#description , #breakAllowance, #minimumOvertime, #btnSave').prop('disabled',false);
    }
    $("#btnSave").click(function(){
        var template_id = $('#entry_id').val();
        var description = $('#description').val();
        var breakAllowance = $('#breakAllowance').val();
        var minimumOvertime = $('#minimumOvertime').val();

        // VALIDATION 
        $('#description, #breakAllowance, #minimumOvertime').removeClass('is-invalid');
        if (!description || !breakAllowance || !minimumOvertime)  {
          if (!description) {
            $('#description').addClass('is-invalid');
          }else{
            $('#description').addClass('is-valid');
          }
          if (!breakAllowance) {
            $('#breakAllowance').addClass('is-invalid');
          }else{
            $('#breakAllowance').addClass('is-valid');
          }
          if (!minimumOvertime) {
            $('#minimumOvertime').addClass('is-invalid');
          }else{
            $('#minimumOvertime').addClass('is-valid');
          }
          return;
        }

        const jsonData = {
          procedure_name_given : 'postJSONScheduleTemplates',
          method_given : 'POST',
          module_given : 'EmployeeProfile-API',
          template_id : template_id,
          description : description,
          break_allowance : breakAllowance,
          minimum_minutes_required_rendered_overtime : minimumOvertime
        };
        
        if(isJSONValid(jsonData)) {
            $('#btnSave').attr('disabled',true);
            $('#btnCancel').hide();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">save</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');
            
           validationAttr();

            //BUTTON NO
            $('#save-message-no-ok').click(function(){
              $('#save-message, #err-save-message').remove();
              $('#btnCancel').show();
           validationRemoveAttr();
            });

            //BUTTON YES
            $('#save-message-ok').click(function(){
              $('#btnSave').hide();
              $('#save-message').remove();
              $('.div-loader').addClass('loader-line');
                executeService(jsonData, function(response_from_service) {
                  //console.log(response_from_service);
                  setTimeout(function(){
                    $('.div-loader').removeClass('loader-line');
                    var success = response_from_service.success;

                    if(success > 0){
                      $('.close, #btnCancel').remove();
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