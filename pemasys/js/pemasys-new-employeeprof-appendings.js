

// function addParentDetails(data, process) {
//     var parentwrapper = $("#input-container-parent");

//     parentwrapper.find(".msg-container").remove();

//     $(parentwrapper).append(parentDetailsHtml(data, process));

//     highlightForm('#input-container-parent', '.parent-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addContactDetails(data, process) {
//     var contactwrapper = $("#input-container-emergency");

//     contactwrapper.find(".msg-container").remove();

//     $(contactwrapper).append(contactDetailsHtml(data, process));

//     highlightForm('#input-container-emergency', '.emergency-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addBeneficiaryDetails(data, process) {
//     var beneficiarywrapper = $("#input-container-beneficiary");

//     beneficiarywrapper.find(".msg-container").remove();

//     $(beneficiarywrapper).append(beneficiaryDetailsHtml(data, process));

//     highlightForm('#input-container-beneficiary', '.beneficiary-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addDependentsDetails(data, process) {
//     var dependentswrapper = $("#input-container-dependents");

//     dependentswrapper.find(".msg-container").remove();

//     $(dependentswrapper).append(dependentDetailsHtml(data, process));

//     highlightForm('#input-container-dependents', '.dependents-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addEmploymentHistoryDetails(data, process) {
//     var employmenthistorywrapper = $("#input-container-employment-history");

//     employmenthistorywrapper.find(".msg-container").remove();

//     $(employmenthistorywrapper).append(employmentHistoryHtml(data, process));

//     highlightForm('#input-container-employment-history', '.employment-history-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addEducationalBackGroundDetails(data, process) {
//     var schoolwrapper = $("#input-container-school");

//     schoolwrapper.find(".msg-container").remove();

//     $(schoolwrapper).append(educationBackgroundHtml(data, process));

//     highlightForm('#input-container-school', '.education-section');

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetInputAutocomplete(".address-input", "searchAddress", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }

// function addCounterParties(data, process) {
//     var counterpartywrapper = $("#counter-party-container");

//     counterpartywrapper.find(".msg-container").remove();

//     $(counterpartywrapper).append(counterPartyHtml(data, process));

//     $('#counter-party-container .counter-party-section:last').find('input:first').focus();

//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
// }

// function addOtherIds(data, process) {
//     var idwrapper = $("#other-ids-container");

//     idwrapper.find(".msg-container").remove();

//     $(idwrapper).append(identificationCardsHtml(data, process));

//     $('#other-ids-container .id-section:last').find('input:first').focus();

//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }



// function addEntityNeccessities(data, process, type, container){
//     var entityneccessitywrapper = $(container);
//     var sectionName = null;

//     if(type === "counterparty"){
//         sectionName = ".counter-party-section";
//     }else if(type === "otherids"){
//         sectionName = ".id-section";
//     }else{
//         return;
//     }

//     var sectionCount = entityneccessitywrapper.find(sectionName).length;

//     if(sectionCount == 0){
//         entityneccessitywrapper.empty();
//     }

//     entityneccessitywrapper.find(".msg-container").remove();
//     if(type === "counterparty"){
//         entityneccessitywrapper.append(counterPartyHtml(data, process));
//     }else if(type === "otherids"){
//         entityneccessitywrapper.append(identificationCardsHtml(data, process));
//     }else{
//         return;
//     }

//     $(container+' '+sectionName+':last').find('input:first').focus();

//     SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
//     SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
//     SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
// }




