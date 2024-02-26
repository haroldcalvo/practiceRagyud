const $id = "#employee-cessation-";
const $class = ".employee-cessation-";

$(document).ready(function () {
    var currDate = new Date();

    setDateRange($id+'submission-date', "max", currDate);
    setDateRange($id+'effective-date', "min", currDate);

    $('#form').submit(function (event) {
        event.preventDefault();
    });

    $($id+'form').on("reset", function () {
        $($class+'employee').val("");
        $($class+'employee').attr("id","");
        $($class+'status').val("");
        $($class+'status').attr("id","");
        $($id+'submission-date').val("");
        $($id+'reason').val(""); 
        $($id+'effective-date').val("");
    });

    $($id+'save-btn').click(function (event) {
        event.preventDefault();
        scrollModal("#employeeCessationModal", "Down");
        validateCessationRequest(event);
    });

    $($id+'search-input').keydown(function (event) {
        if(event.which == 13){
            event.preventDefault();
            searchEmployeeCessation();
        }
    });
});

function searchEmployeeCessation() {
    var tblCount = approving_officer == 0 ? $($id + 'request-table') : $($id + 'request-table ,'+ $id + 'approved-table');

    const employeeName = $($id+'search-input').val();

    $($id + 'request-table ,'+ $id + 'approved-table').find('tbody').empty();

    var cessationResponse = fetchCessationAPIData(0, 0, employeeName, 0);
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
                    '<tr><td style="white-space: nowrap;">' + formatStringNames(oData[i]?.employee_name) + '</td>' +
                    '<td style="white-space: nowrap;">' + oData[i]?.frmt_submission_date + '</td>' +
                    '<td style="white-space: nowrap;">' + 
                        buttonsNeccessary(oData[i]?.entry_id, oData[i]?.apprv_ind, oData[i]?.is_final)+
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
    '<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" onclick="openCessationModal('+id+', \'View\','+isFinal+')"></button>&nbsp;'+
    (apprvInd ==  0 ? 
        '<button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" onclick="openCessationModal('+id+', \'Edit\','+isFinal+')"></button>&nbsp;' : "" ) +
    (apprvInd ==  0 ? 
        '<button class="btn btn-outline-danger btn-sm fa fa-trash" data-toggle="modal" onclick="openCessationModal('+id+', \'Delete\','+isFinal+')"></button>&nbsp;' : "" ) +
    (apprvInd ==  1 ? 
        '<button class="btn btn-outline-primary btn-sm" data-toggle="modal" onclick="openCessationModal('+id+', \'Approve\','+isFinal+')">Approve</button>&nbsp;' : "" ) 
    return btns;
}

function fetchCessationAPIData(bolGetOne, entryId, employeeName, isFinal){
    var rawData = {
        "bol_getone": bolGetOne, 
        "bol_final": isFinal, 
        "entry_id": entryId,
        "user_id": unique_application_user_id,
        "employee_name": employeeName
    };

    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getEmployeeCessationRequest", "POST", formatRequestJSON(rawData));

    return response;
}

function resetViolationModal(){
    $($id+'save-btn').removeClass('btn-danger').addClass('btn-success').html("Save");
    $('#employeeCessationModal').find('#cancel-btn').attr('disabled', false);
    $('#employeeCessationModal').find('#cancel-btn, .close').show();
    $($id+'form').find("input, textarea").prop('disabled', false);
    $('#employeeCessationModal').find('#message-form').empty(); 
    $(".validate").removeClass("invalid");
    $('#cancel-btn').html("Cancel");
    $($id+'form')[0].reset();
    $($id+'save-btn').show();
    $('#cancel-btn').show();
}

function openCessationModal(entryId, process, isFinal){
    resetViolationModal();

    var processAttr = null;

    populateCessation(entryId, process, isFinal);

    if(process === "Add"){
        processAttr = 0;
    }else if(process === "Edit"){
        processAttr = 1;
    }else if(process === "Delete"){
        processAttr = 2;
        $($id+'form').find("input, textarea").prop('disabled', true);
        $($id+'save-btn').removeClass('btn-success').addClass('btn-danger').html(process);
    }else if(process === "Approve"){
        processAttr = 3;
        $($id+'form').find("input, textarea").prop('disabled', true);
        $($id+'save-btn').removeClass('btn-success').addClass('btn-primary').html(process);
    }else if(process === "View"){
        processAttr = 0;
        $($id+'form').find("input, textarea").prop('disabled', true);
        $('#cancel-btn').html("Close");
        $($id+'save-btn').hide();
    }else{
        return;
    }

    $($class+'process').html(process); 
    $($id+'save-btn').attr("data-process",processAttr);
    $($id+'save-btn').attr("data-action",process);

    $('#employeeCessationModal').modal('show'); 

}

function populateCessation(entryId, process, isFinal){
    if(process !== "Add" && entryId !== null){
        var cessationResponse = fetchCessationAPIData(1,entryId,'', isFinal);
        var cessationRawData = JSON.parse(cessationResponse.data);
        if (cessationRawData.code == 200) {
            var cessationData = JSON.parse(cessationRawData.jsonData);

            if(cessationData.length > 0){
                $($id+'entry-id').val(cessationData[0].entry_id);
                $($class+'employee').val(cessationData[0].employee_name);
                $($class+'employee').attr("id",cessationData[0].employee_id);
                $($class+'status').val(cessationData[0].status);
                $($class+'status').attr("id",cessationData[0].status_id);
                $($id+'submission-date').val(cessationData[0].submission_date).slice(0,10);
                $($id+'reason').val(cessationData[0].reason); 
                $($id+'effective-date').val(cessationData[0].effective_date).slice(0,10);

                populateEmployeeInfoForIdentification($class+'employee');
            }
        }
    }
}

function saveEmployeeCessation(event) {
    var process = $($id+'save-btn').attr("data-process");
    var action = $($id+'save-btn').attr("data-action");

    var Obj = {
        "process_type":process,
        "entry_id":(parseInt(process) > 0 ? $($id+'entry-id').val() : 0),
        "employee_id":$($class+'employee').attr("id"),
        "status_id":$($class+'status').attr("id"),
        "submission_date":$($id+'submission-date').val().slice(0,10),
        "reason":$($id+'reason').val().replace(/[\r\n]/g, "\\n"),
        "effective_date":($($id+'effective-date').val().slice(0,10) != "" ? $($id+'effective-date').val().slice(0,10) : null),
        "user_id":unique_application_user_id
    }
    
    postAPIUIprocess(event, action, "#employeeCessationModal", "Employee_ProfileProceduresControllers/Post/postEmployeeCessationRequest", "POST", formatRequestJSON(Obj));
}

function postAPIUIprocess(event, action, modal, apiurl, method, jsondata){
    console.log(event.target);
    if (isJSONValid(jsondata)) {
        $(modal).find('#cancel-btn').attr('disabled', true);
        $(modal).find('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">'+action.toLowerCase()+'</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

        //BUTTON NO
        $(modal).find('#save-message-no-ok').click(function () {
            $(modal).find('#save-message, #err-save-message').remove();
            $(modal).find('#cancel-btn').attr('disabled', false);
        });

        //BUTTON YES
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

function validateCessationRequest(event) {
    var valid = true;
    var $x = $($id+"form");
    var $y = $x.find(".validate");

    $y.each(function () {
        if ($(this).val() === "") {
            $(this).addClass("invalid");
            valid = false;
        } else {
            $(this).removeClass("invalid");
        }
    });

    if (valid) {
        saveEmployeeCessation(event);
    }
}

function populateEmployeeInfoForIdentification(inp){
    var Obj = {
        "employee_id": $(inp).attr('id')
    }

    $($id+"employee-department").val('');
    $($id+"employee-position").val('');
    
    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getEmployeeIdentification", "POST", formatRequestJSON(Obj));
    var rawData = JSON.parse(response.data);
    if (rawData.code == 200) {
        var oData = JSON.parse(rawData.jsonData);
        $($id+"employee-department").val(oData[0].employee_department);
        $($id+"employee-position").val(oData[0].employee_position);
    }
}

function closeImageModal(){
    closeModal();
    $('#viewImageModal').modal('hide');
    $('#employeeCessationModal').modal('show');
}

function viewImage(){
    var srcImg = $($id+"employee-image");
    var viewImg = $($id+"view-employee-image");

    var imgContent = srcImg.attr('src');

    viewImg.attr('src', imgContent);

    if(viewImg?.attr('src')?.trim() !== ''){
        $('#employeeCessationModal').modal('hide');
        $('#viewImageModal').modal('show');
    }
}



