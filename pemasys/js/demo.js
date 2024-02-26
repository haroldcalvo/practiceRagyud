
$(document).ready(function () {
    var currDate = new Date();
    setDateRange('.datehired', "max", currDate);
    setDateRange('#entity-dateofbirth', "max", currDate);

    $('#entityModalForm').submit(function (event) {
        event.preventDefault();
    });

    $('#entityModalForm').find("input").keypress(function (event) {
        if(event.keyCode === 13){
            event.preventDefault();
        }
    });

    setAutocomplete(".accessory-inputs", [], '', '');
    setAutocomplete(".address-input", [], '', '');
    setAutocomplete(".entity-input", [], "populateEntityValuesNecessary", '');

    SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
    SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
    SetInputAutocomplete(".address-input", "searchAddress", "");
    SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
    SetCustomAddEditModalListener(".entity-neccessity-btns", "showEntityNeccesityModal", "");
});

$('#deleteBtn').click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Down");
    saveEmployeeProfile();
});

function resetModal(){
    var elementIcon = $('.search-accessory-btn').find('.fa');
    elementIcon.removeClass().addClass('fa fa-search');
    $('.reset-btn').removeClass('delete-class');
    $('.descriptionInput').removeClass('delete-inp');
    $('.descriptionInput').val('');
    $('.descriptionInput').attr('data-bol-update', '0');
    $('.descriptionInput').attr('disabled', false);
    $('.descriptionInput').attr('data-query', 'invalid');
    $('#myModalForm')[0].reset();
    $('.edit-accessory-btn').prop('disabled', true);
    $('.delete-accessory-btn').prop('disabled', true);
    $('.search-accessory-btn').prop('disabled', false);
    $('.reset-btn').hide();
    $('#updateValueDiv').hide();
    $('#modalBtnCancel').show();
    $('.accModalClose').show();
    $('#modalNeccesityBtn').show();
    $('#modalNeccesityBtn').attr('disabled', false);
    $('#accessory-message-form').html('');
    $('#modalNeccesityBtn').html('Save');
    $('#modalNeccesityBtn').removeClass('btn-danger').addClass('btn-success');
}

function resetOnCancel() {
    resetModal();
    closeModal();
}


function addEditPopUpModal(div) {

    resetModal();

    var targetInput = $(div).closest('.input-group').find('input');

    var type = div.getAttribute('data-query');
    var label = div.getAttribute('data-label');
    
    if(targetInput.hasClass('accessory-inputs')){
        if (type && label) {
            $('.accessory-btn').off('click');
            $('.accessory-btn').click(function (event) {
                event.preventDefault();
                searchAccessoryToUpdate(this, type, label,targetInput)
            });

            $('#modalNeccesityBtn').off('click');
            $('#modalNeccesityBtn').click(function (event) {
                event.preventDefault();
                saveEmployeeAccessories(type, label, targetInput);
            });

            $('#modal-header-label').html('Add or Modify ' + label);
            $('#descriptionLabel').html(label + "&nbsp;:");
            $('.descriptionInput').attr('placeholder', label);

            $('.descriptionInput').removeClass('groupings entities');

            if(targetInput.hasClass('groupings')){
                $('.descriptionInput').addClass('groupings');
            }else if(targetInput.hasClass('entities')){
                $('.descriptionInput').addClass('entities');
            }

            $('#addEditNeccessityModal').modal('show');
        }
    }else if(targetInput.hasClass('entity-input')){
        const bolPerson = $(targetInput).hasClass('nonperson') ? 0 : 1;
        let entityLabel = null;

        $("#enity-neccessity-container, #other-ids-container, #counter-party-container").empty();
        $("#entity-message-form").empty();
        $(".modify-entity-input").prop("disabled", false);

        $('#entityModalCancelBtn, #entityNeccModalClose').show();
        $('#entityModalCancelBtn').attr('disabled', false);

        $(".search-entity-btn").find(".fa").removeClass().addClass('fa fa-search');

        $('.search-entity-input').removeClass('nonperson');

        $('#search-entity-div').hide('');
        $('#entity-form-div').show('');
        $('#entity-info-div').hide('');

        $('#person-entity-only-inputs').hide();
        $('#nonperson-entity-only-inputs').hide();

        $('#add-other-id-div').show();
        $('#modify-other-id-div').show();

        $('#entityModalForm')[0].reset();

        if(bolPerson == 1){
            $('#person-entity-only-inputs').show();
            entityLabel = "Person";
        }else{
            $('#nonperson-entity-only-inputs').show();
            $('#add-other-id-div').hide();
            $('#modify-other-id-div').hide();
            $('.search-entity-input').addClass('nonperson');
            entityLabel = "Non-Person";
        }

        $('.entity-type-label').html(entityLabel);

        $('#entityModalSaveBtn').off('click');
        $('#entityModalSaveBtn').click(function (event) {
            event.preventDefault();
            validateEntityAddEdit(bolPerson, entityLabel, targetInput);
            // saveNewEntity(bolPerson, entityLabel, targetInput);
            // scrollModal("#addEditEntityModal", "Down");
        });
        $('#addEditEntityModal').modal('show');
    }

}

function validateEntityAddEdit(bolPerson, entityLabel, targetInput) {
    var valid = true;
    var entityModalForm = $('#entityModalForm');

    var valInp = entityModalForm.find('.validate:visible:not(:hidden)');

    for (i = 0; i < valInp.length; i++) {
        if (valInp[i].value == "" || parseInt(valInp[i].value) == 0 || $(valInp[i]).hasClass("delete-inp")) {
            valInp[i].classList.add("invalid");
            valid = false;
        } else {
            valInp[i].classList.remove("invalid");
        }
    }

    if(valid){
        scrollModal("#addEditEntityModal", "Down");
        saveNewEntity(bolPerson, entityLabel, targetInput);
    }

}

function saveEmployeeAccessories(type, accName, targetInput) {
    var bolUpdate = parseInt($('.descriptionInput').attr('data-bol-update'));
    if (type) {
        const propertyMap = {
            "postSchoolName": { label: "school_name", id: "school_id" },
            "postOccupation": { label: "description", id: "occupation_id" },
            "postIndustries": { label: "description", id: "industry_id" },
            "postEmploymentPositions": { label: "description", id: "position_id" },
            "postIdentificationCards": { label: "description", id: "id" },
            "getEducationalLevel": { label: "description", id: "education_id" },
            "getEmploymentStatus": { label: "description", id: "status_id" },
        };

        const propertyMapping = propertyMap[type];

        var action = (bolUpdate === 0) ? "Saved!" :
            (bolUpdate === 1) ? "Updated!" :
                (bolUpdate === 2) ? "Deleted!" : null;

        if (!action) {
            return;
        }

        var preAction = (bolUpdate === 0) ? "save" :
            (bolUpdate === 1) ? "update" :
                (bolUpdate === 2) ? "delete" : null;

        if (!preAction) {
            return;
        }

        var description = bolUpdate == 0 ? $('.descriptionInput').val() : $('.updatedValueInput').val();
        var inpIdVal = $('.descriptionInput').attr('id');
        var accessoryId = 0;
        if (inpIdVal) {
            var accessoryId = (inpIdVal !== null && !isNaN(inpIdVal)) ? parseInt(inpIdVal) : 0;
        }

        if (bolUpdate == 2){
            description = "testing";
        }

        if (propertyMapping) {
            let Obj = {
                "process_type": bolUpdate,
                [propertyMapping.label]: formatStringNames(description),
                [propertyMapping.id]: accessoryId
            }

            // JSON data
            var jsonData = formatRequestJSON(Obj);
            if (isJSONValid(jsonData)) {
                $('#modalNeccesityBtn').attr('disabled', true);
                $('#modalBtnCancel').hide();
                $('#accessory-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">' + preAction + '</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

                //BUTTON NO
                $('#save-message-no-ok').click(function () {
                    $('#save-message, #err-save-message').remove();
                    $('#modalBtnCancel').show();
                    $('#modalNeccesityBtn').attr('disabled', false);
                });

                //BUTTON YES
                $('#save-message-ok').click(function () {
                    $('#modalNeccesityBtn').hide();
                    $('#save-message').remove();
                    $('.accessory-div-loader').addClass('loader-line');

                    var urlServiceTag = "Employee_ProfileProceduresControllers/Post/";

                    if($('.descriptionInput').hasClass('groupings')){
                        urlServiceTag = "EntitiesCommon_GroupingsControllers/";
                    }else if($('.descriptionInput').hasClass('entities')){
                        urlServiceTag = "EntitiesCommon_ProceduresControllers/";
                    }

                    let response = InvokeService(urlServiceTag + type, "POST", jsonData);
                    var response_data = JSON.parse(response.data);
                    setTimeout(function () {
                        $('.accessory-div-loader').removeClass('loader-line');

                        if (response_data.code == 200) {
                            $('.accModalClose, #modalBtnCancel').hide();
                            $('#accessory-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">' + accName + ' Successfully ' + action + '<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                            $('#continue-to-reload').click(function () {
                                setTimeout(function () {
                                    // location.reload();
                                    oData = JSON.parse(response_data.jsonData);
                                    console.log(oData);
                                    if(bolUpdate !== 2){
                                        targetInput.val(description);
                                        targetInput.attr('id', oData);
                                    }
                                    closeModal();
                                    $('#addEditNeccessityModal').modal('hide');
                                }, 200);
                            });
                        } else {
                            $('#accessory-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">' + response_data.message + '<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                        }

                        $('#err-save-message-ok').click(function () {
                            setTimeout(function () {
                                resetModal();
                            }, 200);
                        });
                    }, 1200);
                });
            } else {
                $('#accessory-message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
            }
            $('#err-save-message-ok').click(function () {
                setTimeout(function () {
                    location.reload();
                }, 200);
            });
        }
    }
}

function searchAccessoryToUpdate(element, type , label, targetInp){
    var elementIcon = $(element).find('.fa');
    var accessoryInput = $(element).closest('.form-group').find('input.accessory-inputs');
    var accessoryAddOn = $(element).closest('.form-group').find('.input-group-addon');
    var updatedValueInput = $('.updatedValueInput');
    var accessoryAddOnIcon = accessoryAddOn.find('.fa');
    var queryType = type.replace(/post/, "get");
    var iconClass = element.getAttribute('data-icon');

    $('#updateValueDiv').hide();
    accessoryInput.attr('data-bol-update', '0');
    accessoryAddOnIcon.off('click');
    $(updatedValueInput).val('');
    $('#modalNeccesityBtn').prop('disabled', false);

    if(elementIcon.hasClass('fa-search')){
        $('#myModalForm')[0].reset();
        accessoryInput.attr('data-query', queryType);

        accessoryAddOn.show();
        accessoryAddOnIcon.removeClass().addClass('fa '+iconClass);
        elementIcon.removeClass().addClass('fa fa-plus');

        accessoryInput.attr('placeholder', 'Search ' + label);

        SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "enableEditDeleteAccessory,");
    }else if(elementIcon.hasClass('fa-plus')){
        $('#myModalForm')[0].reset();
        elementIcon.removeClass().addClass('fa fa-search');
        accessoryInput.attr('placeholder', label);
        $('.edit-accessory-btn').prop('disabled', true);
        $('.delete-accessory-btn').prop('disabled', true);
        accessoryInput.val('');
        accessoryInput.attr('data-query', 'invalid');
        accessoryInput.off('keypress');
        accessoryInput.attr('placeholder', label);
        accessoryInput.prop('disabled', false);
        accessoryAddOn.hide();
    }else if(elementIcon.hasClass('fa-pencil-square-o')){
        $('.search-accessory-btn').prop('disabled', true);
        $('.delete-accessory-btn').prop('disabled', true);
        $('#updateValueDiv').show();
        updatedValueInput.attr('placeholder', label);
        accessoryInput.attr('data-bol-update', '1');
        accessoryAddOnIcon.removeClass().addClass('fa fa-undo');
        $(accessoryAddOn).click(function (event) {
            event.preventDefault();
            $('#updateValueDiv').hide();
            accessoryAddOnIcon.removeClass().addClass('fa fa-search');
            $('.edit-accessory-btn').prop('disabled', true);
            $('.delete-accessory-btn').prop('disabled', true);
            $('.search-accessory-btn').prop('disabled', false);
            $('#myModalForm')[0].reset();
            accessoryInput.prop('disabled', false);
        });
    }else if(elementIcon.hasClass('fa-trash')){
        $('.edit-accessory-btn').prop('disabled', true);
        $('.search-accessory-btn').prop('disabled', true);
        updatedValueInput.attr('placeholder', label);
        accessoryInput.attr('data-bol-update', '2');
        accessoryAddOnIcon.removeClass().addClass('fa fa-trash');
        accessoryAddOn.addClass('delete-class');
        accessoryInput.addClass('delete-inp');
        $('#modalNeccesityBtn').html('Delete');
        $('#modalNeccesityBtn').removeClass('btn-success').addClass('btn-danger');
        accessoryAddOnIcon.removeClass().addClass('fa fa-undo');
        $(accessoryAddOn).click(function (event) {
            event.preventDefault();
            accessoryAddOnIcon.removeClass().addClass('fa fa-search');
            $('.edit-accessory-btn').prop('disabled', true);
            $('.delete-accessory-btn').prop('disabled', true);
            $('.search-accessory-btn').prop('disabled', false);
            $('#myModalForm')[0].reset();
            accessoryInput.prop('disabled', false);
            $('#modalNeccesityBtn').html('Save');
            $('#modalNeccesityBtn').removeClass('btn-danger').addClass('btn-success');
            accessoryAddOn.removeClass('delete-class');
            accessoryInput.removeClass('delete-inp');
        });
    }
}

function enableEditDeleteAccessory() {
    $('.edit-accessory-btn, .delete-accessory-btn').prop('disabled', false);
    $('.descriptionInput').prop('disabled', true);
    $('#modalNeccesityBtn').prop('disabled', true);
}

function saveEmployeeProfile() {

    var sssInputVal = $("#sssNo").val();
    var tinInputVal = $("#tinNo").val();
    var philHealthInputVal = $("#PhilHealthNo").val();
    var pagibigInputVal = $("#PagIBIGNo").val();

    var sssNum = (sssInputVal !== "" && sssInputVal.length > 0) ? sssInputVal : null;
    // var tinNum = (tinInputVal !== "" && tinInputVal.length > 0) ? tinInputVal : null;
    var philHealthNum = (philHealthInputVal !== "" && philHealthInputVal.length > 0) ? philHealthInputVal : null;
    var pagibigNum = (pagibigInputVal !== "" && pagibigInputVal.length > 0) ? pagibigInputVal : null;

    var employeeInput = $('#employeeId').val();
    var employeeId = 0;
    if (employeeInput) {
        var employeeId = (employeeInput !== null && !isNaN(employeeInput)) ? parseInt(employeeInput) : 0;
    }

    var processType = parseInt($('#nextBtn').attr('data-process'));


    if(processType == null || processType == NaN || processType == undefined){
        return;
    }

    var action = (processType === 0) ? "Saved!" :
        (processType === 1) ? "Updated!" :
        (processType === 2) ? "Deleted!" : null;

    if (!action) {
        return;
    }

    var preAction = (processType === 0) ? "save" :
        (processType === 1) ? "update" :
        (processType === 2) ? "delete" : null;

    if (!preAction) {
        return;
    }


    var Obj = {
        "process_type": processType,
        "employee_id": employeeId,
        "entity_id": $(".entity-employee ").attr("id"),
        "birthplace_town": $(".birthtown").attr("id"),
        "current_number_street": $("#currentstreet").val(),
        "current_barangay": $(".currentbarangay").attr("id"), 
        "zip_code": $("#currentzipcode").val(),
        "tax_identification": null,
        "sss_number": sssNum,
        "philhealth_number": philHealthNum,
        "pag_ibig_number": pagibigNum,
        "date_hired": $(".datehired").val(),
        "created_by": 1,
        "parent_details": fetchData('#input-container-parent','.parent-section', familyInfoTemplate),
        "beneficiary_details": fetchData('#input-container-beneficiary','.beneficiary-section', beneficiaryInfoTemplate),
        "dependents_details": fetchData('#input-container-dependents','.dependents-section', dependentInfoTemplate),
        "emergency_contact_details": fetchData('#input-container-emergency','.emergency-section', contactInfoTemplate),
        "education_details": fetchData('#input-container-school','.education-section', educationInfoTemplate),
        "employment_history": fetchData('#input-container-employment-history','.employment-history-section', employmentInfoTemplate)
    }

    console.log(Obj);

    var jsonData = formatRequestJSON(Obj);
    if (isJSONValid(jsonData)) {
        $('#prevBtn').attr('disabled', true);
        // $('#btnCancel').hide();
        $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">'+preAction+'</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

        //BUTTON NO
        $('#save-message-no-ok').click(function () {
            $('#save-message, #err-save-message').remove();
            // $('#btnCancel').show();
            $('#prevBtn').attr('disabled', false);
        });

        //BUTTON YES
        $('#save-message-ok').click(function () {
            $('#prevBtn').hide();
            $('#save-message').remove();
            $('.div-loader').addClass('loader-line');

            let response = InvokeService("Employee_ProfileProceduresControllers/Post/postEmployeeProfile", "POST", jsonData);
            console.log(response);
            var response_data = JSON.parse(response.data);
            setTimeout(function () {
                $('.div-loader').removeClass('loader-line');

                if (response_data.code == 200) {
                    // $('.empModalClose, #btnCancel').hide();
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">Employee Profile Successfully '+action+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function () {
                        setTimeout(function () {
                            // location.reload();
                            closeModal();
                            searchEmployee();
                            // $('#addEditNeccessityModal').modal('hide');
                        }, 200);
                    });
                } else {
                    $('#message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">' + response_data.message + '<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                }

                $('#err-save-message-ok').click(function () {
                    setTimeout(function () {
                        // location.reload();
                        $('#prevBtn').attr('disabled', false);
                        formatModalForViewing('Save');
                        resetModalValue();
                    }, 200);
                });
            }, 1200);
        });
    } else {
        $('#message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
    }
    $('#err-save-message-ok').click(function () {
        setTimeout(function () {
            location.reload();
        }, 200);
    });
}

function searchEmployee() {
    $('#employeeTbody').empty();

    var rawData = {
        "bol_getone": 0,
        "employee_name": searchname.value,
        "employee_id": 0,
    };

    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getEmployeeProfile", "POST", formatRequestJSON(rawData));
    $('#searchname').attr("disabled", false);
    if (response.code == 200) {
        var invoice, oInvoice;
        invoice = JSON.parse(response.data);
        if (invoice.code == 200) {
            oInvoice = JSON.parse(invoice.jsonData);

            for (var i = 0; i < oInvoice.length; i++) {
                var sex = "Male";
                if(oInvoice[i].sex == 1){
                    sex = "Female";
                }

                $('#employeeTbody').append(
                    '<tr><td style="white-space: nowrap;">' + oInvoice[i].frmt_date_created + '</td>' +
                    '<td style="white-space: nowrap;">' + formatStringNames(oInvoice[i].employee_name) + '</td>' +
                    '<td style="white-space: nowrap;">' + formatStringNames(oInvoice[i].status) + '</td>' +
                    '<td style="white-space: nowrap;">' + formatStringNames(oInvoice[i].current_address) + '</td>' +
                    '<td style="white-space: nowrap;">' + sex + '</td>' +
                    '<td style="white-space: nowrap;">' + oInvoice[i].mobilephone1 + '</td>' +
                    '<td style="white-space: nowrap;">' + oInvoice[i].email_address1 + '</td>' +
                    '<td style="white-space: nowrap;">' + 
                        '<button class="btn btn-outline-primary btn-sm fa fa-eye" data-toggle="modal" onclick="viewOrEditEmployeeProfile('+oInvoice[i].employee_id+', \'View\')"></button>&nbsp;'+
                        '<button class="btn btn-outline-success btn-sm fa fa-edit" data-toggle="modal" onclick="viewOrEditEmployeeProfile('+oInvoice[i].employee_id+', \'Edit\')"></button>&nbsp;'+
                        ( oInvoice[i].status_id == 0 ? '<button class="btn btn-outline-danger btn-sm fa fa-trash" data-toggle="modal" onclick="viewOrEditEmployeeProfile('+oInvoice[i].employee_id+', \'Delete\')"></button>&nbsp;' : '')+
                    '</td></tr>'
                );
            }

        } else {
            $('#employeeTbody').append(
                "<tr> " +
                "<td class='border text-center px-0' colspan='100%'>"+invoice.message+".</td>" +
                "</tr>"
            );
        }
    } else {
        $('#employeeTbody').append(
            "<tr> " +
            "<td class='border text-center px-0' colspan='100%'>"+response.message+".</td>" +
            "</tr>"
        );
    }


}

$('#searchname').keypress(function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        $('#searchname').attr("disabled", true);
        searchEmployee();
    }
});

function formatModalForViewing(process){
    $('.empModalClose').show();
    $('#prevBtn').show();
    $('#prevBtn').prop("disabled", false);
    $('#nextBtn').show();
    $('#closeBtn').hide();
    $('#closeBtn').html("Close");
    $('#deleteBtn').hide();
    if(process == "View" || process == "Delete"){
        $('#prevBtn').hide();
        $('#nextBtn').hide();
        if(process == "View"){
            $('#closeBtn').show();
        }else if(process == "Delete"){
            $('#closeBtn').show();
            $('#closeBtn').html("Cancel");
            $('#deleteBtn').show();
        }
        
        $(".form-step").show();
        $('.form-step').removeClass("tab");
        $('.steps-icon').hide();
        $('.show-modal-div').hide();
        $('.addbtn-container').hide();
        $('#employeeProfileModalLabel').html(process + " Employee Profile");
        $('#nextBtn').attr('data-process', '2');
    }else{
        $(".form-step").removeClass("active");
        $(".form-step").eq(0).addClass("active");
        $(".step").removeClass().addClass("step");
        $(".form-step").hide();
        $(".form-step").eq(0).show();
        $('.form-step').addClass("tab");
        $('.steps-icon').show();
        $('.show-modal-div').show();
        $('.addbtn-container').show();
        if(process == "Save"){
            $('#employeeProfileModalLabel').html("Add Employee Profile");
            $('#nextBtn').attr('data-process', '0');
        }else if(process == "Edit"){
            $('#employeeProfileModalLabel').html("Edit Employee Profile");
            $('#nextBtn').attr('data-process', '1');
        }

        currentTab = 0;
        showTab(currentTab);
    }
}

function addEmployeeProfBtnListener(){
    formatModalForViewing('Save');
    resetModalValue();
}

function resetModalValue(){
    $('#myForm')[0].reset();
    $("#input-container-parent").empty();
    $("#input-container-emergency").empty();
    $("#input-container-beneficiary").empty();
    $("#input-container-dependents").empty();
    $("#input-container-employment-history").empty();
    $("#input-container-school").empty(); 
    $("#person-ids-container").empty();
    $('#message-form').html('');

    $("input").prop("readonly", false);
}

function viewOrEditEmployeeProfile(id, apiProcess){
    resetModalValue();
    var process = "View";
    var rawData = {
        "bol_getone": 1,
        "employee_name": "",
        "employee_id": id,
    };

    if (apiProcess == "Edit"){
        process = "Edit";
    }

    var response = InvokeService("Employee_ProfileProceduresControllers/Get/getEmployeeProfile", "POST", formatRequestJSON(rawData));
    if (response.code == 200) {
        var employees, oEmployees;
        employees = JSON.parse(response.data);
        if (employees.code == 200) {
            oEmployees = JSON.parse(employees.jsonData);
            var oEmployee = oEmployees[0];

            $("#employeeId").val(oEmployee.employee_id);

            $(".entity-employee").val(oEmployee.employee_name);
            $("#birthday").val(oEmployee.birthdate);
            $("#sex").val(oEmployee.sex);
            $("#age").val(oEmployee.age);
            $("#civilstatus").val(oEmployee.civilstatus);
            $("#home_country").val(oEmployee.home_country_name);
            $("#home_province").val(oEmployee.home_province_name);
            $("#home_town").val(oEmployee.home_town_name);
            $("#home_barangay").val(oEmployee.home_barangay_name);
            $("#home_street").val(oEmployee.home_number_street);
            $("#home_zip_code").val(oEmployee.home_zip_code);
            $(".datehired").val(oEmployee.date_hired);
            $(".employmentstatus").val(oEmployee.status);
            $(".employmentstatus").attr("id", oEmployee.status_id);
            $("#employeeEntityId").val(oEmployee.entity_id);
            $("#sssNo").val(oEmployee.sss_number);
            $("#tinNo").val(oEmployee.tax_identification);
            $("#PhilHealthNo").val(oEmployee.philhealth_number);
            $("#PagIBIGNo").val(oEmployee.pag_ibig_number);

            $(".birthcountry").val(oEmployee.birthplace_country_name);
            $(".birthcountry").attr("id", oEmployee.birthplace_country);
            $(".birthprovince").val(oEmployee.birthplace_province_name);
            $(".birthprovince").attr("id", oEmployee.birthplace_province);
            $(".birthtown").val(oEmployee.birthplace_town_name);
            $(".birthtown").attr("id", oEmployee.birthplace_town);

            $(".currentcountry").val(oEmployee.current_country_name);
            $(".currentcountry").attr("id", oEmployee.current_country);
            $(".currentprovince").val(oEmployee.current_province_name);
            $(".currentprovince").attr("id", oEmployee.current_province);
            $(".currenttown").val(oEmployee.current_town_name);
            $(".currenttown").attr("id", oEmployee.current_town);
            $(".currentbarangay").val(oEmployee.current_barangay_name);
            $(".currentbarangay").attr("id", oEmployee.current_barangay);

            $("#currentstreet").val(oEmployee.current_number_street);
            $("#currentzipcode").val(oEmployee.current_zip_code);

            $(".entity-employee").prop('readonly', true);

            if (apiProcess !== "Edit"){
                $("#currentstreet").prop('readonly', true);
                $("#currentzipcode").prop('readonly', true);
                $(".birthcountry").prop('readonly', true);
                $(".birthprovince").prop('readonly', true);
                $(".birthtown").prop('readonly', true);

                $(".currentcountry").prop('readonly', true);
                $(".currentprovince").prop('readonly', true);
                $(".currenttown").prop('readonly', true);
                $(".currentbarangay").prop('readonly', true);

                $(".entity-employee").prop('readonly', true);
                $("#sssNo").prop('readonly', true);
                $("#tinNo").prop('readonly', true);
                $("#PhilHealthNo").prop('readonly', true);
                $("#PagIBIGNo").prop('readonly', true);
                $(".datehired").prop('readonly', true);
                $(".employmentstatus").prop('readonly', true);
            }

            var employeeParents = oEmployee?.parent_details;
            for (var i = 0; i < employeeParents?.length; i++) {
                addSectionDetails("#input-container-parent", employeeParents[i], process, '.parent-section', parentDetailsHtml, false);
            }

            var employeeContacts = oEmployee?.emergency_contact_details;
            for (var i = 0; i < employeeContacts?.length; i++) {
                addSectionDetails("#input-container-emergency", employeeContacts[i], process, '.emergency-section', contactDetailsHtml, false);
            }

            var employeeBeneficiary = oEmployee?.beneficiary_details;
            for (var i = 0; i < employeeBeneficiary?.length; i++) {
                addSectionDetails("#input-container-beneficiary", employeeBeneficiary[i], process, '.beneficiary-section', beneficiaryDetailsHtml, false);
            }

            var employeeDependents = oEmployee?.dependents_details;
            for (var i = 0; i < employeeDependents?.length; i++) {
                addSectionDetails("#input-container-dependents", employeeDependents[i], process, '.dependents-section', dependentDetailsHtml, false);
            }

            var employeeEmploymentHistory = oEmployee?.employment_history;
            for (var i = 0; i < employeeEmploymentHistory?.length; i++) {
                addSectionDetails("#input-container-employment-history", employeeEmploymentHistory[i], process, '.employment-history-section', employmentHistoryHtml, false);
            }

            var employeeEducationBackground = oEmployee?.education_details;
            for (var i = 0; i < employeeEducationBackground?.length; i++) {
                addSectionDetails("#input-container-school", employeeEducationBackground[i], process, '.education-section', educationBackgroundHtml, false);
            }

            var personOtherIds = oEmployee?.person_other_ids;
            if(personOtherIds?.length > 0){
                for (var i = 0; i < personOtherIds?.length; i++) {
                    addSectionDetails("#person-ids-container", personOtherIds[i], "View", '.id-section', identificationCardsHtml, false);
                }
            }else{
                $("#person-ids-container").append(noEntityAccDataMessage("No linked Identification Cards"));
            }
            
        } else {

        }
    } else {

    }

    if(apiProcess == "Delete"){
        process = apiProcess;
    }

    formatModalForViewing(process);
    $('#employeeProfileModal').modal('show');
}


