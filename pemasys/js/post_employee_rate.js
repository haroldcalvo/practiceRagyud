$(document).ready(function(){
    $('#daily_rate').on('keyup', function() {
        const emp_id = $('#employee_id').val();
        const dalRate = $(this).val();
        jsonObjExecuteService = {};
        jsonObjExecuteService ["procedure_name_given"] = "getEmpRateRange";  //given json element do not remove
        jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
        jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
        // here is to create jsonObject needed for procedure
        jsonObjExecuteService ["emp_id"] = emp_id;
        executeService(jsonObjExecuteService, function(response_from_service) {
            if (dalRate > response_from_service.max_daily_rate) {
                $('#amt_validate').remove();
                $('#amt_validate_div').prepend('<span id="amt_validate" class="control-label mb-1"><small class="is-invalid">Amount must not be greater than '+response_from_service.max_daily_rate);
                $('#btnSave').attr('disabled',true);
            } else if (dalRate < response_from_service.min_daily_rate) {
                $('#amt_validate').remove();
                $('#amt_validate_div').prepend('<span id="amt_validate" class="control-label mb-1"><small class="is-invalid">Amount must not be lesser than '+response_from_service.min_daily_rate);
                $('#btnSave').attr('disabled',true);
            }else{
                $('#amt_validate').remove();
                $('#btnSave').removeAttr('disabled',true);
            }
        });
    });
    $('.exemptions').on('keyup', function() {
        const personal_exemption = $('#personal_exemption').val().replace(/,/g,'') || 0;
        const dependents_exemption = $('#dependents_exemption').val().replace(/,/g,'') || 0;
        $('#total_exemptions').val(numberFormat(parseFloat(personal_exemption)+parseFloat(dependents_exemption)));

    });
    $('#btnSave').click(function(){     
        var employee_id = document.getElementById("employee_id").value.trim();
        var daily_rate = document.getElementById("daily_rate").value.trim();
        var dependents_exemption = document.getElementById("dependents_exemption").value.trim();
        var personal_exemption = document.getElementById("personal_exemption").value.trim();

        if(employee_id == 0 || daily_rate == 0 || dependents_exemption == 0 || personal_exemption == 0){
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">Please fill all the inputs.<span id="ok-message" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;">OK</span></small><br></span>');
        }else{
            $('#save-message').remove();
            $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Are you sure you want to save this employee rate?'
                                        +'<span id="cancelButton" class="pull-right" style="color:#dc3545;cursor:pointer;font-size:14px;letter-spacing: 1px; margin-left:7px;">No</span>'
                                        +'<span id="confirmationButton" class="pull-right" style="color:#007bff;cursor:pointer;font-size:14px;letter-spacing: 1px;"margin-left:10px;>Yes</span></small><br></span>');
        }
        $('#ok-message').click(function(){
            $('#save-message').remove();
            $('#btnSave').removeAttr('disabled',true);
            $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').removeAttr('readOnly',true);
            $('#daily_paid,#entitled_overtime,#entitled_holiday').removeAttr('disabled',true);
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
                var serializedFormData = $('#employee_rate_form').serialize();
                jsonObjExecuteService = {};
                $.each(serializedFormData.split('&'), function(index, field) {
                    var kvPair = field.split('=');
                    var key = decodeURIComponent(kvPair[0]);
                    var value = decodeURIComponent(kvPair[1]);
                    jsonObjExecuteService[""+key+""] = value;
                });
                jsonObjExecuteService ["procedure_name_given"] = "postEmpRate";  //given json element do not remove
                jsonObjExecuteService ["method_given"] = "POST"; //given json element do not remove
                jsonObjExecuteService ["module_given"] = "EmployeeProfile-API"; //given json element do not remove
                // here is to create jsonObject needed for procedure
                jsonObjExecuteService ["requested_by"] = unique_application_user_id;
                jsonObjExecuteService ["daily_rate"] = jsonObjExecuteService.daily_rate.replace(/,/g,'');
                jsonObjExecuteService ["personal_exemption"] = jsonObjExecuteService.personal_exemption.replace(/,/g,'');
                jsonObjExecuteService ["dependents_exemption"] = jsonObjExecuteService.dependents_exemption.replace(/,/g,'');
                jsonObjExecuteService["daily_paid"] = $('#daily_paid').prop('checked') ? 1 : 0;
                jsonObjExecuteService["entitled_overtime"] = $('#entitled_overtime').prop('checked') ? 1 : 0;
                jsonObjExecuteService["entitled_holiday"] = $('#entitled_holiday').prop('checked') ? 1 : 0;
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
        $('#employee_description,#daily_rate,#personal_exemption,#dependents_exemption').attr('readOnly',true);
        $('#daily_paid,#entitled_overtime,#entitled_holiday').attr('disabled',true);
        $('#btnSave').attr('disabled',true);

    });
});
function numberFormat(num) {
	return `${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}