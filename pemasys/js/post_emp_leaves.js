$(document).ready(function(){
    allocateReturnId(0);
    $('#btnSave').click(function(){
        var leave_credits_entry_id = document.getElementById("leave_credits_entry_id").value.trim();
        var starting_date_applied = document.getElementById("starting_date_applied").value.trim();
        var number_of_hours = document.getElementById("number_of_hours").value.trim();
        var remarks = document.getElementById("remarks").value.trim();
        if (leave_credits_entry_id == 0 || starting_date_applied == "" ||  number_of_hours === "" || remarks === "") {
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Please fill all the inputs.<span id="ok-message" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">OK</span></small><br></span>');
        }else{
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Are you sure you want to save this data?'
                                        +'<span id="cancelButton" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">No</span>'
                                        +'<span id="confirmationButton" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Yes</span></small><br></span>');
        }
        $('#ok-message,#cancelButton').click(function(){
			$('#save-message').remove();
			$('#btnSave').removeAttr('disabled',true);
			$('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').removeAttr('readOnly',true);
		});
        $('#confirmationButton').click(function(){
            $('#btnSave,#btnCancel').hide();
            $('.div-loader').addClass('loader-line');
            $('#save-message').remove();
            $('#save-message').remove();
            setTimeout(function(){
                var serializedFormData = $('#request_leave_form').serialize();
                jsonObjExecuteService = {};
                $.each(serializedFormData.split('&'), function(index, field) {
                    var kvPair = field.split('=');
                    var key = decodeURIComponent(kvPair[0]);
                    var value = decodeURIComponent(kvPair[1]);
                    jsonObjExecuteService[""+key+""] = value;
                });
                jsonObjExecuteService ["procedure_name_given"] = "postRequestLeave";  //given json element do not remove
                jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                // here is to create jsonObject needed for procedure
                jsonObjExecuteService ["user_id"] = unique_application_user_id;
               
                executeService(jsonObjExecuteService, function(response_from_service) {
					var statusReturned = response_from_service.success;
					var entry_id = response_from_service.entry_id;
					var messageReturned = response_from_service.message;
					$('.div-loader').removeClass('loader-line');
					if(statusReturned == 1){
						$('#save-message,.close').remove();
						$('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+messageReturned+'<span id="continue-to-reload" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">Continue</span></small><br></span>');
							$('#continue-to-reload').click(function(){
								$('#largeModal').modal('hide');
                                allocateReturnId(entry_id);
								$('#btnSave,#btnCancel').removeAttr('disabled',true);
							});
					}else{
						$('#save-message').remove();
						$('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+messageReturned+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
					}
					$('#err-save-message-ok').click(function(){
						$('#save-message').remove();
                    	$('#btnSave,#btnCancel').show();
						$('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').removeAttr('readOnly',true);
						$('#btnSave').removeAttr('disabled',true);
					});
				}); 
            },1200);
        });
        $('#leave_credits_entry_description,#starting_date_applied,#number_of_hours,#remarks').attr('readOnly',true);
        $('#btnSave').attr('disabled',true);
    });
});