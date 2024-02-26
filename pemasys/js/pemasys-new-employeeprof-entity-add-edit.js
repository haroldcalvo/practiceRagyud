
function searchEntityToUpdate(element) {
    $("#enity-neccessity-container, #other-ids-container, #counter-party-container").empty();
    $(".modify-entity-input").prop("disabled", false);
    $('#entity-info-div').hide('');

    var elementIcon = $(element).find('.fa');

    if (elementIcon.hasClass('fa-search')) {
        $('#search-entity-div').show('');
        $('#entity-form-div').hide('');
        elementIcon.removeClass().addClass('fa fa-plus');
        $('#entityModalForm')[0].reset();
    } else if (elementIcon.hasClass('fa-plus')) {
        $('#search-entity-div').hide('');
        $('#entity-form-div').show('');
        elementIcon.removeClass().addClass('fa fa-search');
        $('#entityModalForm')[0].reset();
    }
}

function showResultOnEntitySelect() {
    $('#search-entity-div').hide('');
    $('#entity-form-div').show('');
}

$(document).ready(function () {
    $('.entity-btn').click(function (event) {
        event.preventDefault();
        searchEntityToUpdate(this)
    });
});

function updateEntityNeccessities(neccessityName, typeLabel) {
    var Obj = {};
    var urlTag = "";

    if (!neccessityName) {
        return;
    }

    if (neccessityName === "counter-party-section") {
        urlTag = "putEntitiesCounterParty";
        Obj = {
            "entity_id": $('.search-entity-input').attr("id"),
            "counter_parties": fetchData('#enity-neccessity-container','.counter-party-section', counterPartyTemplate)
        }
    } else if (neccessityName === "id-section") {
        urlTag = "putPersonIds";
        var Obj = {
            "entity_id": $('.search-entity-input').attr("id"),
            "person_ids": fetchData('#enity-neccessity-container','.id-section', personIdTemplate)
        }
    } else {
        return;
    }

    var jsonData = formatRequestJSON(Obj);
    if (isJSONValid(jsonData)) {
        $('#enity-neccessity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">update</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

        //BUTTON NO
        $('#save-message-no-ok').click(function () {
            $('#save-message, #err-save-message').remove();
        });

        //BUTTON YES
        $('#save-message-ok').click(function () {
            $('#save-message').remove();
            $('.enity-neccessity-div-loader').addClass('loader-line');

            let response = InvokeService("EntitiesCommon_ProceduresControllers/" + urlTag, "PUT", jsonData);
            var response_data = JSON.parse(response.data);
            setTimeout(function () {
                $('.enity-neccessity-div-loader').removeClass('loader-line');

                if (response_data.code == 200) {
                    $('#enity-neccessity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">' + typeLabel + ' Successfully Updated!<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function () {
                        setTimeout(function () {
                            $("#enity-neccessity-message-form").empty();
                            // if (neccessityName === "id-section") {
                            //     ("#person-ids-container")
                            //     populateEntityNeccessities($('.search-entity-input').attr("id"), "View", "id-section", "#person-ids-container");
                            // }
                            closeModal();
                        }, 200);
                    });
                } else {
                    $('#enity-neccessity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">' + response_data.message + '<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                }

                $('#err-save-message-ok').click(function () {
                    setTimeout(function () {
                        $("#enity-neccessity-message-form").empty();
                        closeModal();
                    }, 200);
                });
            }, 1200);
        });
    } else {
        $('#enity-neccessity-message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
    }
    $('#err-save-message-ok').click(function () {
        setTimeout(function () {
        }, 200);
    });

}

function showEntityNeccesityModal(btn) {
    var necSection = btn.getAttribute('data-section');
    var necHtmlFunc = necSection === "id-section" ? identificationCardsHtml : necSection === "counter-party-section" ? counterPartyHtml : null;
    var label = btn.getAttribute('data-label');
    $("#enity-neccessity-container").empty();
    $("#enity-neccessity-message-form").empty();
    populateEntityNeccessities($('.search-entity-input').attr("id"), "Edit", necSection, "#enity-neccessity-container");
    if (necSection && label) {
        $('#entityNeccessitySaveBtn').off('click');
        $('#entityNeccessitySaveBtn').click(function (event) {
            event.preventDefault();
            updateEntityNeccessities(necSection, label);
        });

        $('.enity-neccessity-lbl').html(label);

        $('#add-enity-neccessity').off('click');
        $("#add-enity-neccessity").click(function (event) {
            event.preventDefault();
            addSectionDetails("#enity-neccessity-container", null, "Save", ('.'+necSection), necHtmlFunc, false);
        });

        $('#entityNeccessityModal').modal('show');

    }
}


function saveNewEntity(bolPerson, entityLabel, inp) {
    var sex = $("#entity-male").prop("checked") ? 0 : 1;

    var Obj = {
        "bol_person": bolPerson,
        "bol_counter_party": 1,
        "last_name": (bolPerson == 1 ? formatStringNames($("#entity-lastname").val()) : null),
        "first_name": (bolPerson == 1 ? formatStringNames($("#entity-firstname").val()) : null),
        "middle_name": (bolPerson == 1 ? formatStringNames($("#entity-middlename").val()) : null),
        "sex": (bolPerson == 1 ? sex : null),
        "birth_date": (bolPerson == 1 ? $("#entity-dateofbirth").val() : null),
        "civil_status": (bolPerson == 1 ? $("#entity-civilstatus").val() : null),
        "nonperson_name": (bolPerson == 0 ? $("#entity-companyname").val() : null),
        "contact_person1": (bolPerson == 0 ? $(".entity-contact1").attr("id") : null),
        "contact_person2": (bolPerson == 0 ? $(".entity-contact2").attr("id") : null),
        "tax_identification": $("#entity-tin").val(),
        "house_street": formatStringNames($("#entity-housestreet").val()),
        "barangay_id": $(".entity-barangay").attr("id"),
        "zip_code": $("#entity-zipcode").val(),
        "email_address1": $("#entity-emailadd1").val(),
        "email_address2": $("#entity-emailadd2").val(),
        "email_address3": $("#entity-emailadd3").val(),
        "land_phone1": $("#entity-telnumber1").val(),
        "land_phone2": $("#entity-telnumber2").val(),
        "mobile_phone1": $("#entity-mobilenumber1").val(),
        "mobile_phone2": $("#entity-mobilenumber2").val(),
        "posted_by": 1,
        "group_id": (parseInt($(".entity-group").attr("id")) > 0 ? $(".entity-group").attr("id") : null),
        "counter_parties": fetchData('#counter-party-container','.counter-party-section', counterPartyTemplate),
        "person_ids": fetchData('#other-ids-container','.id-section', personIdTemplate)
    }

    var jsonData = formatRequestJSON(Obj);
    if (isJSONValid(jsonData)) {
        $('#entityModalCancelBtn').attr('disabled', true);
        // $('#btnCancel').hide();
        $('#entity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">save</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');

        //BUTTON NO
        $('#save-message-no-ok').click(function () {
            $('#save-message, #err-save-message').remove();
            // $('#btnCancel').show();
            $('#entityModalCancelBtn').attr('disabled', false);
        });

        //BUTTON YES
        $('#save-message-ok').click(function () {
            $('#entityModalCancelBtn, #entityNeccModalClose').hide();
            $('#save-message').remove();
            $('.entity-div-loader').addClass('loader-line');

            let response = InvokeService("EntitiesCommon_ProceduresControllers/postPersonNonperson", "POST", jsonData);
            var response_data = JSON.parse(response.data);
            setTimeout(function () {
                $('.entity-div-loader').removeClass('loader-line');

                if (response_data.code == 200) {
                    // $('.empModalClose, #btnCancel').hide();
                    $('#entity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+entityLabel+' Successfully Saved!<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                    $('#continue-to-reload').click(function () {
                        setTimeout(function () {
                            // location.reload();
                            closeModal();
                            // $('#addEditNeccessityModal').modal('hide');
                            oData = JSON.parse(response_data.jsonData);
                            inp.id = oData;
                            populateEntityValuesNecessary(inp, bolPerson);
                        }, 200);
                    });
                } else {
                    $('#entity-message-form').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">' + response_data.message + '<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
                }

                $('#err-save-message-ok').click(function () {
                    setTimeout(function () {
                        // location.reload();
                        $('#entity-message-form').empty();
                        $('#entityModalCancelBtn, #entityNeccModalClose').show();
                        $('#entityModalCancelBtn').attr('disabled', false);
                    }, 200);
                });
            }, 1200);
        });
    } else {
        $('#entity-message-form').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok">Try again</span></small><br></span>');
    }
    $('#err-save-message-ok').click(function () {
        setTimeout(function () {
            location.reload();
        }, 200);
    });
}


