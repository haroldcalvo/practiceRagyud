const $id = "#employee-violation-";
const $class = ".employee-violation-";
var requestDataObj = [];
var approvedDataObj = [];

$(document).ready(function () {
    var currDate = new Date();

    setDateRange($id+'date', "max", currDate);

    $($id+'form').submit(function (event) {
        event.preventDefault();
    });

    $("#employee-add-btn").click(function (event) {
        event.preventDefault();
        $(".no-employee-error").hide();
        addSectionDetails(($id+"employees-container"), null, "Save", '.employee-section', employeeHtml, false);
    });

    $($id+'form').on("reset", function () {
        $($id+'incident').val("");
        $($id+'incident-cause').val("");
        $($id+'action-taken').val("");
        $($id+'policy-violated').val("");
    });

    $($id+'save-btn').click(function (event) {
        event.preventDefault();
        scrollModal("#employeeViolationModal", "Down");
        validateViolationRequest(event);
    });

    $('#warning-save-btn').click(function (event) {
        event.preventDefault();
        saveEmployeeViolation(event);
    });

    $($id+'search-input').keydown(function (event) {
        if(event.which == 13){
            event.preventDefault();
            searchEmployeeViolation();
        }
    });

});

function searchEmployeeViolation() {

    var tblCount = approving_officer == 0 ? $($id + 'request-table') : $($id + 'request-table ,'+ $id + 'approved-table');
    const employeeName = $($id+'search-input').val();

    $($id + 'request-table ,'+ $id + 'approved-table').find('tbody').empty();

    var cessationResponse = fetchViolationAPIData(0, 0, employeeName, 0);
    if (cessationResponse.code == 200) {
        cessationRawData = JSON.parse(cessationResponse.data);
        if (cessationRawData.code == 200) {
            var oData = JSON.parse(cessationRawData.jsonData);   
            for (var i = 0; i < oData.length; i++) {
                var tableName = null;
                if(oData[i]?.is_final === 0 ){
                    tableName = "request-table";
                }else if(oData[i]?.is_final === 1){
                    tableName = "approved-table";
                }

                $($id+tableName).find('tbody').append(
                    '<tr><td style="white-space: nowrap;">' + formatStringNames(oData[i].employee_name) + '</td>' +
                    '<td style="white-space: nowrap;">' + limitStringTo10Words(oData[i].policy_violated, 10, true)+ '</td>' +
                    '<td style="white-space: nowrap;">' + 
                        buttonsNeccessary(oData[i]?.primary_id, oData[i]?.apprv_ind, oData[i]?.is_final)+
                    '</td></tr>'
                );
            }
        } else {
            $($id + 'request-table ,'+ $id + 'approved-table').find('tbody').append(
                "<tr class='not-count'><td class='border text-center px-0' colspan='100%'>"+cessationRawData.message+".</td></tr>"
            );
        }
    } else {
        $($id + 'request-table ,'+ $id + 'approved-table').find('tbody').append(
            "<tr class='not-count'><td class='border text-center px-0' colspan='100%'>"+cessationResponse.message+".</td></tr>"
        );
    }

    var tr_length = tblCount.children('tbody').children('tr:not(.not-count)').length;
    $('.card-title').children().children('span').text(tr_length);

    if($($id+'request-table').find('tbody').html().trim() == ""){
        $($id + 'request-table').find('tbody').append(
            "<tr class='not-count'><td class='border text-center px-0' colspan='100%'>No Data Found.</td></tr>"
        );
    }

    if($($id+'approved-table').find('tbody').html().trim() == ""){
        $($id + 'approved-table').find('tbody').append(
            "<tr class='not-count'><td class='border text-center px-0' colspan='100%'>No Data Found.</td></tr>"
        );
    }

}

function buttonsNeccessary(id, apprvInd, isFinal){
    var btns = 
    '<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" onclick="openViolationModal('+id+', \'View\','+isFinal+')"></button>&nbsp;'+
    (apprvInd ==  0 ? 
        '<button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" onclick="openViolationModal('+id+', \'Edit\','+isFinal+')"></button>&nbsp;' : "" ) +
    (apprvInd ==  0 ? 
        '<button class="btn btn-outline-danger btn-sm fa fa-trash" data-toggle="modal" onclick="openViolationModal('+id+', \'Delete\','+isFinal+')"></button>&nbsp;' : "" ) +
    (apprvInd ==  1 ? 
        '<button class="btn btn-outline-primary btn-sm" data-toggle="modal" onclick="openViolationModal('+id+', \'Approve\','+isFinal+')">Approve</button>&nbsp;' : "" ) 
    return btns;
}
function fetchViolationAPIData(bolGetOne, primaryId, employeeName, isFinal){
    var rawData = {
        "bol_getone": bolGetOne, 
        "bol_final": isFinal,
        "user_id": unique_application_user_id,
        "employee_name": employeeName,
        "primary_id": primaryId
    };

    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getEmployeeRequestViolations", "POST", formatRequestJSON(rawData));

    return response;
}

function resetViolationModal(){
    $($id+'save-btn').removeClass('btn-danger').addClass('btn-success').html("Save");
    $('#employeeViolationModal').find('#cancel-btn').attr('disabled', false);
    $('#employeeViolationModal').find('#cancel-btn, .close').show();
    $('#employeeViolationModal').find('#message-form').empty(); 
    $($id+'form').find("input, textarea").prop('disabled', false);
    $(".validate").removeClass("invalid");
    $($id+"employees-container").empty();
    $('#cancel-btn').html("Cancel");
    $(".no-employee-error").hide();
    $('.employee-add-div').show();
    $($id+'form')[0].reset();
    $($id+'save-btn').show();
    $('#cancel-btn').show();
}

function openViolationModal(primaryId, process, isFinal){
    resetViolationModal();

    var processAttr = null;

    populateViolationDetails(primaryId, process, isFinal);

    if(process === "Add"){
        processAttr = 0;
    }else if(process === "Edit"){
        processAttr = 1;
    }else if(process === "Delete"){
        processAttr = 2;
        $('.employee-add-div').hide();
        $($id+'form').find("input, textarea").prop('disabled', true);
        $($id+'save-btn').removeClass('btn-success').addClass('btn-danger').html(process);
    }else if(process === "Approve"){
        processAttr = 3;
        $('.employee-add-div').hide();
        $($id+'form').find("input, textarea").prop('disabled', true);
        $($id+'save-btn').removeClass('btn-success').addClass('btn-primary').html(process);
        checkEmployeeCessation();
    }else if(process === "View"){
        processAttr = 0;
        $('.employee-add-div').hide();
        $($id+'form').find("input, textarea").prop('disabled', true);
        $('#cancel-btn').html("Close");
        $($id+'save-btn').hide();
    }else{
        return;
    }

    $($class+'process').html(process); 
    $($id+'save-btn').attr("data-process",processAttr);
    $($id+'save-btn').attr("data-action",process);

    $('#employeeViolationModal').modal('show'); 

}

function populateViolationDetails(primaryId, process, isFinal){
    var employeeInvolvedRequest = null;

    if(process !== "Add" && primaryId !== null){
        var violationResponse = fetchViolationAPIData(1,primaryId,'', isFinal);
        var violationRawData = JSON.parse(violationResponse.data);
        if (violationRawData.code == 200) {
            var violationData = JSON.parse(violationRawData.jsonData);

            if(violationData.length > 0){
                $($id+'entry-id').val(violationData[0].primary_id);
                $($id+'incident').val(violationData[0].incident);
                $($id+'date').val(violationData[0].date_of_incident.slice(0,10));
                $($id+'incident-cause').val(violationData[0].incident_cause);
                $($id+'action-taken').val(violationData[0].actions_taken);
                $($id+'policy-violated').val(violationData[0].policy_violated);

                var employeeInvolvedRequest = violationData[0]?.employees_involved;

                for (var i = 0; i < employeeInvolvedRequest?.length; i++) {
                    addSectionDetails(($id+"employees-container"), employeeInvolvedRequest[i], process, '.employee-section', employeeHtml, false);
                }
            }
        }
    }
}

function saveEmployeeViolation(event) {
    var process = $($id+'save-btn').attr("data-process");
    var action = $($id+'save-btn').attr("data-action");
    var pname = "postEmployeeRequestViolation";

    var employeesInvolvedData = null;
    var checkData = checkEmployeeCessation();

    if(parseInt(process) === 3){
        pname = "postApproveViolations";
        if(checkData.jsn_message == null || (checkData.jsn_message.length > 0 && getNumberOfOverwrites() == 0)){
            employeesInvolvedData = null;
        }else{
            employeesInvolvedData = getObjwithOverwrites();
        }
    }else{
        employeesInvolvedData = fetchData($id+"employees-container",'.employee-section', employeeNameTemplate);
    }

    var Obj = {
        "process_type": process,
        "request_id":(parseInt(process) > 0 ? $($id+'entry-id').val() : 0), 
        "incident":$($id+'incident').val().replace(/[\r\n]/g, "\\n"),
        "incident_cause":$($id+'incident-cause').val().replace(/[\r\n]/g, "\\n"),
        "incident_date":$($id+'date').val()+" 00:00:00",
        "action_taken":$($id+'action-taken').val().replace(/[\r\n]/g, "\\n"),
        "policies_violated":$($id+'policy-violated').val().replace(/[\r\n]/g, "\\n"),
        "employees_involved":employeesInvolvedData,
        "user_id":unique_application_user_id
    }

    postAPIUIprocess(event, action, $(event.currentTarget).closest('div.modal'), "Employee_ProfileProceduresControllers/Post/"+pname, "POST", formatRequestJSON(Obj), checkData);
}

function postAPIUIprocess(event, action, modal, apiurl, method, jsondata, checkData){

    if(modal.attr('id').trim() == 'employeeViolationModal' && action == 'Approve'){
        var oData = checkData;
        var jsnMessage = oData.jsn_message;
        var jsnData = JSON.parse(oData.jsn_data);    

        $($class+'employee-chklist-container').empty();
        $($id+'check-cessation-msg').empty();
    }

    if (isJSONValid(jsondata)) {
        $(modal).find('#cancel-btn').attr('disabled', true);
        $(modal).find('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">'+action.toLowerCase()+'</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

        //BUTTON NO
        $(modal).find('#save-message-no-ok').click(function () {
            $(modal).find('#save-message, #err-save-message').remove();
            $(modal).find('#cancel-btn').attr('disabled', false);
        });

        //BUTTON YES
        $(modal).find('#save-message-ok').off('click');
        if(jsnMessage != null && modal.attr('id').trim() == 'employeeViolationModal' && action == 'Approve'){
            $($id+'check-cessation-msg').html(jsnMessage);
            for (var i = 0; i < jsnData?.length; i++) {
                if(jsnData[i].bol_existing === 1){
                    addSectionDetails(($class+"employee-chklist-container"), jsnData[i], 'Save', '.employee-with-pending-section', employeeWithPendingCessationHtml, false);
                }
            }
            $(modal).find('#save-message-ok').click(function () {
                $("#warningModal").modal("show");
            });
        }else{
            $(modal).find('#save-message-ok').click(function () {
                $(modal).find('#cancel-btn, .close').hide();
                $(modal).find('#save-message').remove();
                $(modal).find('.div-loader').addClass('loader-line');
    
                let response = InvokeService(apiurl, method, jsondata);
                var response_data = JSON.parse(response.data);
                setTimeout(function () {
                    $(modal).find('.div-loader').removeClass('loader-line');
                    if (response_data.code == 200) {
                        $(event.target).hide();
    
                        oData = response_data.jsonData;
                        if((oData.trim() != null && oData.trim() != "") && $(event.target).attr('data-process') == "3"){
                            displayWarningModal(oData);
                        }
                        $(modal).find('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">' + response_data.message + '<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                        $(modal).find('#continue-to-reload').click(function () {
                            setTimeout(function () {
                                window.location.reload();
                            }, 200);
                        });
                    } else {
                        $(event.target).attr('disabled', true);
                        $(modal).find('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">' + response_data.message + '<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                    }
    
                    $(modal).find('#err-save-message-ok').click(function () {
                        setTimeout(function () {
                            $(modal).find('#cancel-btn, .close').show();
                            $(modal).find('#cancel-btn').attr('disabled', false);
                            $(event.target).attr('disabled', false);
                            $(modal).find("form")[0].reset();
                            $(modal).find('#message-form').empty();
                        }, 200);
                    });
                }, 1200);
            });
        }

    } else {
        $(modal).find('#message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
    }
    $(modal).find('#err-save-message-ok').click(function () {
        setTimeout(function () {
            $(modal).find('#cancel-btn, .close').show();
            $(modal).find('#cancel-btn').attr('disabled', false);
            $(modal).modal("hide");
        }, 200);
    });
}

function validateViolationRequest(event) {
    var valid = true;
    var $x = $($id+"form");
    var $y = $x.find(".validate");
    var $msg = $(".no-employee-error");

    if($($id+"employees-container").html().trim() === ""){
        $msg.show();
        valid = false;
    }else{
        $msg.hide();
    }


    $y.each(function () {
        if ($(this).val() === "") {
            $(this).addClass("invalid");
            valid = false;
        } else {
            $(this).removeClass("invalid");
        }
    });

    if (valid) {
        saveEmployeeViolation(event);
    }
}

function displayWarningModal(message){
    $($id+'warning-message').html(message);
    $("#warningModal").modal("show");
}

function checkEmployeeCessation(){
    var returnData = null;

    var Obj = {
        "violation_request_id": $($id+'entry-id').val()
    }

    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getCheckEmployeeCessationEntries", "POST", formatRequestJSON(Obj));
    var rawData = JSON.parse(response.data);
    if (rawData.code == 200) {
        var returnData = JSON.parse(rawData.jsonData);
    }

    return returnData;
}

function getNumberOfOverwrites(){
    var numberOfOverwrites = 0;

    if($('.employee-overwrite-chk-bx:checked')?.length > 0){
        numberOfOverwrites = $('.employee-overwrite-chk-bx:checked').length;
    }

    return numberOfOverwrites;
}

function getEmployeeIdtoOverwrites(){
    var array = [];

    $('.employee-overwrite-chk-bx').each(function () {
        if($(this).prop('checked') == true){
            array.push(parseInt($(this).attr('id')));
        }
    });

    return array;
}

function getObjwithOverwrites(){
    var oData = JSON.parse(checkEmployeeCessation().jsn_data);

    for (var i = 0; i < oData?.length; i++) {
        delete oData[i].employee_name;
        delete oData[i].bol_existing;
        if(getEmployeeIdtoOverwrites().includes(oData[i].employee_id)){
            oData[i].bol_overwrite = 1;
        }else{
            oData[i].bol_overwrite = 0;
        }
    }

    return oData;
}




