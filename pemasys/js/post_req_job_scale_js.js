$(document).ready(function(){
    $('#btnSave').click(function(){   
        var job_id = document.getElementById("job_id").value.trim();
        var scaled_id = document.getElementById("scaled_id").value.trim();
        if (job_id == 0 || scaled_id == 0){
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Please fill all the inputs.<span id="ok-message" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">OK</span></small><br></span>');
        }else{
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Are you sure you want to save this job scale?'
                                        +'<span id="cancelButton" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">No</span>'
                                        +'<span id="confirmationButton" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Yes</span></small><br></span>');
        }
        $('#ok-message').click(function(){
            $('#save-message').remove();
            $('#btnSave').removeAttr('disabled',true);
            $('#job_reference_descrip,#pay_scale_descrip').removeAttr('readOnly',true);
        });
        $('#cancelButton').click(function(){
            $('#save-message').remove();
            $('#largeModal').modal('hide');
        });
        $('#confirmationButton').click(function(){
            $('#btnSave,#btnCancel').hide();
            $('.div-loader').addClass('loader-line');
            $('#save-message').remove();
            $('#save-message').remove();
            setTimeout(function(){
                var serializedFormData = $('#req_pay_scale_form').serialize();
                jsonObjExecuteService = {};
                $.each(serializedFormData.split('&'), function(index, field) {
                    var kvPair = field.split('=');
                    var key = decodeURIComponent(kvPair[0]);
                    var value = decodeURIComponent(kvPair[1]);
                    jsonObjExecuteService[""+key+""] = value;
                });
                jsonObjExecuteService ["procedure_name_given"] = "postReqPayScale";  //given json element do not remove
                jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                // here is to create jsonObject needed for procedure
                jsonObjExecuteService ["requested_by"] = unique_application_user_id;
                executeService(jsonObjExecuteService, function(response_from_service) {

                    var statusReturned = response_from_service.success;
                    var messageReturned = response_from_service.message;
                    if(statusReturned == 1){
                        $('#save-message').remove();
                        $('.div-loader').removeClass('loader-line');
                        $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+messageReturned+'<span id="continue-to-reload" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">Continue</span></small><br></span>');
                            $('#continue-to-reload').click(function(){
                                setTimeout(function(){
                                location.reload();
                                },200);
                            });
                    }else{
                        $('#save-message').remove();
                        $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+messageReturned+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
                    }
                        $('#err-save-message-ok').click(function(){
                        setTimeout(function(){
                            location.reload();
                        },200);
                    });
                }); 
            },1200);
        });
        $('#job_reference_descrip,#pay_scale_descrip').attr('readOnly',true);
        $('#btnSave').attr('disabled',true);
    });
});