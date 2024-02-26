$(document).ready(function(){
    allocateReturnId(0);
    $('#btnSave').click(function(){
        var leave_credits_entry_id = document.getElementById("leave_credits_entry_id").value.trim();
        var number_of_hours = document.getElementById("number_of_hours").value.trim();
        var remarks = document.getElementById("remarks").value.trim();
        var add_to_credits = $('#add_to_credits').is(":checked") ? 1 : 0;

        if (leave_credits_entry_id == 0 || number_of_hours === "" ||  remarks === "") {
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Please fill all the inputs.<span id="ok-message" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">OK</span></small><br></span>');
        }else{
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Are you sure you want to save this data?'
                                        +'<span id="cancelButtonSave" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">No</span>'
                                        +'<span id="confirmationButtonSave" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Yes</span></small><br></span>');
        }
        $('#ok-message,#cancelButtonSave').click(function(){
			$('#save-message').remove();
			$('#btnSave,#btnCancel').removeAttr('disabled',true);
			$('#leave_credits_entry_description,#number_of_hours,#add_to_credits,#remarks').removeAttr('readOnly',true);
            $('#add_to_credits').prop('checked',false);
		});

        $('#confirmationButtonSave').click(function(){
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">This leave credit adjustment cannot be deleted once saved?'
	    								+'<span id="cancelButton" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">Cancel</span>'
	    								+'<span id="confirmationButton" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Confirm</span></small><br></span>');
            $('#cancelButton').click(function(){
                $('#save-message').remove();
                $('#btnSave,#btnCancel').removeAttr('disabled',true);
                $('#leave_credits_entry_description,#number_of_hours,#add_to_credits,#remarks').removeAttr('readOnly',true);
                $('#add_to_credits').prop('checked',false);
            });
            $('#confirmationButton').click(function(){
                $('#btnSave,#btnCancel').hide();
                $('.div-loader').addClass('loader-line');
                $('#save-message').remove();
                setTimeout(function(){
                    var serializedFormData = $('#leave_credit_adjustment').serialize();
                    jsonObjExecuteService = {};
                    $.each(serializedFormData.split('&'), function(index, field) {
                        var kvPair = field.split('=');
                        var key = decodeURIComponent(kvPair[0]);
                        var value = decodeURIComponent(kvPair[1]);
                        jsonObjExecuteService[""+key+""] = value;
                    });
                    jsonObjExecuteService ["procedure_name_given"] = "postLeaveCreditAdjustment";  //given json element do not remove
                    jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                    jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                    // here is to create jsonObject needed for procedure
                    jsonObjExecuteService ["add_to_credits"] = add_to_credits;
                    jsonObjExecuteService ["user_id"] = unique_application_user_id;
                    
                    executeService(jsonObjExecuteService, function(response_from_service) {
                    	var statusReturned = response_from_service.success;
                        var entry_id = response_from_service.entry_id;
                    	var messageReturned = response_from_service.message;
                        $('.div-loader').removeClass('loader-line');
                    	if(statusReturned == 1){
                    		$('#save-message').remove();
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
                            $('#btnSave,#btnCancel').removeAttr('disabled',true);
                            $('#leave_credits_entry_description,#number_of_hours,#add_to_credits,#remarks').removeAttr('readOnly',true);
                            $('#add_to_credits').prop('checked',false);
                    	});
                    });
                },1200);
            });
        });
        $('#leave_credits_entry_description,#number_of_hours,#add_to_credits,#remarks').attr('readOnly',true);
        $('#add_to_credits').prop('checked',true);
        $('#btnSave').attr('disabled',true);
    });
});