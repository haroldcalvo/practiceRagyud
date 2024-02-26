$(document).ready(function(){
    $('#btnSave').click(function(){
        var job_description = document.getElementById("job_description").value.trim();
        var employee_type_id = document.getElementById("employee_type_id").value.trim();
        var employee_education_id = document.getElementById("employee_education_id").value.trim();
        if (job_description === "" || employee_type_id === "" || employee_education_id === ""){
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Please fill all the inputs.<span id="ok-message" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">OK</span></small><br></span>');
        }else{
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Are you sure you want to save this job reference?'
                                        +'<span id="cancelButton" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">No</span>'
                                        +'<span id="confirmationButton" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Yes</span></small><br></span>');
        }
        $('#ok-message').click(function(){
            $('#save-message').remove();
            $('#btnSave').removeAttr('disabled',true);
            $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').removeAttr('readOnly',true);
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
                var serializedFormData = $('#job_reference_form').serialize();
                jsonObjExecuteService = {};
                $.each(serializedFormData.split('&'), function(index, field) {
                    var kvPair = field.split('=');
                    var key = decodeURIComponent(kvPair[0]);
                    var value = decodeURIComponent(kvPair[1]);
                    jsonObjExecuteService[""+key+""] = value;
                });
                var department_check = $("input[name='department_pack[]']:checked").map(function(){return $(this).val();}).get();

                jsonObjExecuteService ["procedure_name_given"] = "postJobReference";  //given json element do not remove
                jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                // here is to create jsonObject needed for procedure
                jsonObjExecuteService ["created_by"] = unique_application_user_id;

                jsonObjPP = [];
                delete jsonObjExecuteService["department_pack[]"];

                for(var i = 0; i < department_check.length; i++){
                    deparmentChecked = {};
                    deparmentChecked ["department_id"] = department_check[i];
                    jsonObjPP.push(deparmentChecked);
                }
                jsonObjExecuteService["deparment_pack"] = jsonObjPP;
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
        $('#job_description,#employee_type_description,#employee_education_description,#qualifications,#work_experiences,#duties_and_responsibilities').attr('readOnly',true);
        $('#btnSave').attr('disabled',true);
    });
});