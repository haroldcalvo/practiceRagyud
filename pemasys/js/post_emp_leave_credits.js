$(document).ready(function(){
    allocateReturnId();

    $('#btnSave').click(function(){
        var employee_id = document.getElementById("employee_id").value.trim();
        var leave_id = document.getElementById("leave_id").value.trim();
        var leave_credits_in_hours = document.getElementById("leave_credits_in_hours").value.trim();
        if (employee_id == 0 || leave_id == 0 ||  leave_credits_in_hours === "") {
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
			$('#employee_description,#leave_description,#leave_credits_in_hours').removeAttr('readOnly',true);
		});
        $('#confirmationButton').click(function(){
            $('#btnSave,#btnCancel').hide();
            $('.div-loader').addClass('loader-line');
            $('#save-message').remove();
            setTimeout(function(){
                var serializedFormData = $('#request_leave_credits_form').serialize();
                jsonObjExecuteService = {};
                $.each(serializedFormData.split('&'), function(index, field) {
                    var kvPair = field.split('=');
                    var key = decodeURIComponent(kvPair[0]);
                    var value = decodeURIComponent(kvPair[1]);
                    jsonObjExecuteService[key] = /^\d+$/.test(value) ? Number(value) : value;
                });
                if(!jsonObjExecuteService.request_id){
                    delete jsonObjExecuteService ["request_id"];
                }
                jsonObjExecuteService ["procedure_name_given"] = "postJSONRequestEmployeesLeaveCredits";  //given json element do not remove
				jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
				jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                jsonObjExecuteService ["user"] = unique_application_user_id;
                executeService(jsonObjExecuteService, function(response_from_service) {
					var statusReturned = response_from_service.success;
                    var entry_id = response_from_service.request_id;
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
                        $('.div-loader').removeClass('loader-line');
						$('#save-message').remove();
						$('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+messageReturned+'<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
					}
					$('#err-save-message-ok').click(function(){
                        $('#save-message').remove();
                        $('#btnSave,#btnCancel').show();
                        $('#employee_description,#leave_description,#leave_credits_in_hours').removeAttr('readOnly',true);
                        $('#btnSave').removeAttr('disabled',true);
					});
				});
            },1200);
        });
        $('#employee_description,#leave_description,#leave_credits_in_hours').attr('readOnly',true);
        $('#btnSave').attr('disabled',true);
    });
});