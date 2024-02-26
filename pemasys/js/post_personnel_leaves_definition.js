$(document).ready(function(){
	allocateReturnId();
    $('#btnSave').click(function(){
        var description = document.getElementById("description").value.trim();
        var min_hours = document.getElementById("min_hours").value.trim();
        var max_hours = document.getElementById("max_hours").value.trim();
        var employment_status_id = document.getElementById("employment_status_id").value.trim();
        var employee_type_id = document.getElementById("employee_type_id").value.trim();
        var dayb = document.getElementById("dayb").value.trim();
        var tenureM = document.getElementById("tenureM").value.trim();
        var governMandated = $('#governMandated').is(":checked") ? 1 : 0;
        var wpay = $('#wpay').is(":checked") ? 1 : 0;
        var monetize = $('#monetize').is(":checked") ? 1 : 0;

        if (description === "" || min_hours === "" || max_hours === "" || employment_status_id === "" || employee_type_id === "" || dayb === "" || tenureM === "") {
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
			$('#btnSave,#btnCancel').removeAttr('disabled',true);
			$('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').removeAttr('readOnly',true);
            $('#governMandated,#wpay,#monetize').removeAttr('disabled',true);
		});
        $('#confirmationButton').click(function(){
            $('#btnSave,#btnCancel').hide();
            $('.div-loader').addClass('loader-line');
            $('#save-message').remove();
            setTimeout(function(){
                var serializedFormData = $('#personnel_definition_form').serialize();
				jsonObjExecuteService = {};
				jsonObjExecuteService ["procedure_name_given"] = "postJSONEmployeeLeaveDefinition";  //given json element do not remove
				jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
				jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                $.each(serializedFormData.split('&'), function(index, field) {
					var kvPair = field.split('=');
					var key = decodeURIComponent(kvPair[0]);
					var value = decodeURIComponent(kvPair[1]);
					jsonObjExecuteService[key] = /^\d+$/.test(value) ? Number(value) : value;
				});
                if(!jsonObjExecuteService.leave_id){
                    delete jsonObjExecuteService ["leave_id"];
                }
                jsonObjExecuteService ["govt_mandated"] = governMandated;
                jsonObjExecuteService ["with_pay"] = wpay;
                jsonObjExecuteService ["can_be_monetized"] = monetize;
                jsonObjExecuteService ["user"] = unique_application_user_id;
                executeService(jsonObjExecuteService, function(response_from_service) {
					var statusReturned = response_from_service.success;
                    var entry_id = response_from_service.entry_id;
					var messageReturned = response_from_service.message;
					if(statusReturned == 1){
						$('#save-message,.close').remove();
						$('.div-loader').removeClass('loader-line');
						$('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+messageReturned+'<span id="continue-to-reload" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">Continue</span></small><br></span>');
							$('#continue-to-reload').click(function(){
								$('#largeModal').modal('hide');
                                allocateReturnId(entry_id);
                                $('#btnSave,#btnCancel').removeAttr('disabled',true);
							});
					}else{
						$('#save-message').remove();
						$('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+messageReturned+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
					}
					$('#err-save-message-ok').click(function(){
						$('#save-message').remove();
                        $('#btnSave,#btnCancel').show();
                        $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').removeAttr('readOnly',true);
						$('#governMandated,#wpay,#monetize').removeAttr('disabled',true);
						$('#btnSave').removeAttr('disabled',true);
					});
				});
            },1200);

        });
        $('#description,#min_hours,#max_hours,#employment_status_description,#employment_type_description,#dayb,#tenureM').attr('readOnly',true);
        $('#governMandated,#wpay,#monetize').attr('disabled',true);
        $('#btnSave').attr('disabled',true);
    });
});