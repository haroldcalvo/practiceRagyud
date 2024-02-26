/*-----------------------------------------------------------------------------------------------------------COMMON GENERAL MULTI-PURPOSE FUNCTIONS----------------------------------------------------------------------------------------------*/

var currentTab = 0;


$(document).ready(function () {
    setAutocomplete(".accessory-inputs", [], '', '');
    setAutocomplete(".address-input", [], '', '');
    setAutocomplete(".entity-input", [], "populateEntityValuesNecessary", '');

    SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
    SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
    SetInputAutocomplete(".address-input", "searchAddress", "");
    SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
    SetCustomAddEditModalListener(".entity-neccessity-btns", "showEntityNeccesityModal", "");
});

// FUNCTIONS THAT CONTROLS THE SHOWING OF TABS IN THE MULTI-STEP EMPLOYEE PROFILE MODAL
function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Save";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }

    fixStepIndicator(n);
}

// SET DATE RANGE FOR DATE INPUTS
function setDateRange(inp, attr, date) {
    if (attr === "max" || attr === "min") {

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        var dateVal = null;

        if (date instanceof Date) {
            dateVal = date;
        } else if (datePattern.test(date.slice(0, 10))) {
            const parts = date.slice(0, 10).split('-');
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const day = parseInt(parts[2]);

            dateVal = new Date(year, month, day);
        } else {
            return;
        }

        $(inp).on('keydown', function (e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }
        });

        $(inp).on('change', function () {
            var inputDate = new Date($(this).val());
            var maxDate = new Date($(this).attr('max'));
            var minDate = new Date($(this).attr('min'));

            if (inputDate > maxDate) {
                $(this).val($(this).attr('max'));
            } else if (inputDate < minDate) {
                $(this).val($(this).attr('min'));
            }
        });

        var yyyy = dateVal.getFullYear();
        var mm = String(dateVal.getMonth() + 1).padStart(2, '0');
        var dd = String(dateVal.getDate()).padStart(2, '0');

        dateVal = yyyy + '-' + mm + '-' + dd;
        $(inp).attr(attr, dateVal);
    }
}

// DETERMINES WHICH TAB IS ACTIVE AND ASSIGNS "active" CLASS TO IT
function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");

    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }

    x[n].className += " active";
}

// THIS FUNCTION DETERMINES IF THE JSON STRING IS VALID 
function isJSONValid(jsonData) {
    try {
        JSON.parse(jsonData);
        return true;
    } catch (error) {
        return false;
    }
}

// THIS FUNCTION RETURNS A MESSAGE HTML ELEMENT THAT ALLOWS MESSAGE CUSTOMIZATION
function noEntityAccDataMessage(message) {
    var messageHtml = $(
        '<div class="form-group" style="text-align: center;">' +
        '<p class="pb-2 display-5">' + message + '.</p>' +
        '</div>'
    );

    return messageHtml;
}

function limitStringTo10Words(string, wordcount, ellipsis) {
    const words = string.split(' ');

    const limitedString = words.slice(0, wordcount).join(' ') + (ellipsis ? "..." : "");

    return limitedString.trim();
}

function highlightForm(formContainer, formSection, bolHighlight) {
    const target = $(formContainer + ' ' + formSection + ':last');

    if (bolHighlight) {
        target.find('input:first').focus().end().css('background-color', 'rgba(0, 0, 0, 0.04)');
        $(formContainer + ' ' + formSection + ':not(:last)').css('background-color', 'transparent');
    } else {
        target.find('input:first').focus();
    }
}

// THIS FUNCTION IS USE TO CAPITALIZED THE FIRST LETTER OF EVERY WORD IN A STRING
function formatStringNames(string) {
    if (string) {
        const words = string.split(" ");

        const capitalizedWords = words.map(word => {
            if (word.length === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        const resultString = capitalizedWords.join(" ");

        const trimmedString = resultString.trim();

        return trimmedString;
    }
}

// THIS FUNCTION CONCATS ENTITY ID AND ENTITY NAME TO PRODUCE THIS RESULT: "Very, Handsome James (00143)"
function formatSearchName(number, name) {
    const numberString = paddString(number, 5);

    const capitalizedFirstName = formatStringNames(name);

    const result = `${capitalizedFirstName} (${numberString})`;

    return result;
}

function combineArrayObjects(array1, array2, where, keys, keyConditions) {
    let flatArray1 = array1.flat();
    let flatArray2 = array2.flat();

    const filtered = keys && keys.length > 0 && keys.every(key => key !== null && key !== false && key !== undefined);

    if (where === "first" && filtered) {
        flatArray1 = flatArray1.filter(item => keys.some((key, index) => item?.[key] === keyConditions[index]));
    } else if (where === "second" && filtered) {
        flatArray2 = flatArray2.filter(item => keys.some((key, index) => item?.[key] === keyConditions[index]));
    }

    let combinedArray = [...flatArray1, ...flatArray2];

    if (where === "combined" && filtered) {
        combinedArray = combinedArray.filter(item => keys.some((key, index) => item?.[key] === keyConditions[index]));
    }

    return combinedArray;
}


// THIS FUNCTION PADS STRING TO HOW MANY CHARACTERE LENGTH YOU WANT WITH ITS PARAMETER : padCount
function paddString(string, padCount) {
    const numberString = string.toString().padStart(padCount, '0');

    return numberString;
}

// THIS FUNCTION IS USED TO PROPERLY CLOSE CHILD MODALS
function closeModal() {
    $(document).find('.child-modal').on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });
}

// THIS FUNCTION ALLOWS THE CUSTOMIZE SETTING OF FUNCTIONS TO THE EVENT HANDLER "click". MOSTLY USED IN FORM APPENDINGS
function SetCustomAddEditModalListener(attrName, functionName, params) {
    for (let element of document.querySelectorAll(attrName)) {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            ExecuteFunction(functionName, params, element);
        });
    }
}

// THIS FUNCTION INITIALIZE AND CUSTOMIZE INPUT AUTOCOMPLETE'S (a.k.a. SEARCH SELECT'S) SOURCE ARRAY, TARGET, FUNCTION TO BE INVOKE UPON SELECT AND ITS PARAMETERS
function setAutocomplete(attrName, src, functionName, params) {
    $(attrName).autocomplete({
        source: src,
        minLength: 0,
        delay: 0,
        maxShowItems: 3,
        select: function (event, ui) {
            var e = ui.item;
            event.target.id = e.id;
            event.target.title = e.label;
            if (functionName) {
                ExecuteFunction(functionName, params, event.target);
            }
        }
    })
}

//THIS FUNCTION SETS THE FUNCTION TO BE INVOKED UPON KEYPRESS TO THE DESIRED INPUT BASED ON THE attrName
function SetInputAutocomplete(attrName, functionName, params) {
    for (let inp of document.querySelectorAll(attrName)) {
        inp.addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                ExecuteFunction(functionName, params, inp);
            }
        });
        inp.addEventListener("blur", function (event) {
            $(attrName).autocomplete("option", "source", []);
        });
    }
}

// THIS FUNCTION IS USE TO APPEND THE HTML APPENDINGS TO THE SPECIFIED container
function addSectionDetails(container, data, process, sectionClass, sectionHtmlFunction, bolHighlight) {
    var containerWrapper = $(container);
    var currDate = new Date();

    var sectionCount = containerWrapper.find(sectionClass).length;
    if (sectionCount == 0) {
        containerWrapper.empty();
    }

    containerWrapper.find(".msg-container").remove();
    containerWrapper.append(sectionHtmlFunction(data, process));

    highlightForm(container, sectionClass, bolHighlight);

    SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");

    if (sectionClass === '.education-section') {
        SetInputAutocomplete(".address-input", "searchAddress", "");
        setDateRange('input[name="dateGraduated"]', "max", currDate);
    } else {
        SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
        setDateRange('input[name="fromDate"]', "max", currDate);
        $('input[name="fromDate"]').on('change', function () {
            var fromDateValue = $(this).val().slice(0, 10);
            var toDateInput = $(this).closest('.employment-history-section').find('input[name="toDate"]');
            toDateInput.val('');

            setDateRange(toDateInput, "min", fromDateValue);
            setDateRange(toDateInput, "max", currDate);
        });
    }

    SetCustomAddEditModalListener(".show-modal-div", "addEditPopUpModal", "");
}

function scrollModal(modal, direction) {
    var scrollLength = direction === "Up" ? $(modal)[0].scrollHeight : direction === "Down" ? 0 : null;
    if (scrollLength !== null) {
        $(modal).animate({ scrollTop: scrollLength }, "fast");
    }
}

// THIS FUNCTION IS USED TO FETCH DATA THROUGH FORM GROUPS WITH THE HELP OF THE OBJECT TEMPLATES
function fetchData(container, sectionClass, template) {
    var data = [];

    $(container).find(sectionClass).each(function () {
        var info = {};

        for (const key in template) {
            if (template.hasOwnProperty(key)) {
                var inputName = template[key].name;
                var inputSource = template[key].source;
                var input = $(this).find('input[name="' + inputName + '"]');
                var value = null;

                if (inputSource === "id") {
                    var inpId = input.attr('id');
                    if (input.val() != "" && inpId.length > 0) {
                        value = inpId;
                    }
                } else if (inputSource === "value") {
                    value = input.val();
                } else if (inputSource === "check") {
                    value = (input.prop('checked') === true ? 1 : 0);
                }

                console.log(value);
                info[key] = /*(value !== null && !isNaN(value)) ? parseInt(value) :*/ value;
            }
        }

        data.push(info);
    });

    return data;
}

// THIS FUNCTION IS USED TO FETCH ENTTIY (PERSON OR NON-PERSON) DATA FOR SEARCH SELECT
function searchEntityForProfiling(inp) {
    var bolPerson = $(inp).hasClass('nonperson') ? 0 : 1;
    var bolEmployee = $(inp).hasClass('entity-employee') ? 1 : 0;
    if (inp.value.length > 0) {
        var rawData = { "bol_getone": 0, "bol_person": bolPerson, "bol_employee": bolEmployee, "description": inp.value, "entity_id": 0 };

        let response = InvokeService("EntitiesCommon_ProceduresControllers/getPersonDetails", "POST", formatRequestJSON(rawData));
        console.log(response)
        var response_data = JSON.parse(response.data);
        if (response_data.code == 200) {
            arrInfo = JSON.parse(response_data.jsonData);
            for (var i = 0; i < arrInfo.length; i++) {
                arrInfo[i].label = $(inp).hasClass('nonperson') ? arrInfo[i].nonperson_name : arrInfo[i].fullname;
                arrInfo[i].id = $(inp).hasClass('nonperson') ? arrInfo[i].nonperson_id : arrInfo[i].person_id;
                arrInfo[i].label = $(inp).hasClass('entity-modify') ? formatSearchName(arrInfo[i].id, arrInfo[i].label) : formatStringNames(arrInfo[i].label);
            }
            setAutocomplete(".entity-input", arrInfo, "populateEntityValuesNecessary", String(bolPerson));
            inp.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));

        } else if (response_data.code == 404) {
            inp.value = "No Data Found";
        }
    }
}

// THIS FUNCTION IS USED TO FETCH AUXILLARY DETAILS LIKE OCCUPATION, RELATION AND ETC. WHAT AUXILLARY DATA TO BE FETCHED DEPENDS ON THE "data-query" ATTRIBUTE OF INPUT
function searchDropdowns(inp, functionName, params) {
    var fName = inp.getAttribute('data-query');
    var callBackFunction = inp?.getAttribute('data-function');
    var active = 0;

    if ($(inp).hasClass('cessations')) {
        active = 1;
    }

    if (inp.value.length > 0) {
        const propertyMap = {
            "getSchoolName": { label: "school_name", id: "school_id" },
            "getOccupation": { label: "description", id: "occupation_id" },
            "getRelations": { label: "description", id: "relation_id" },
            "getEducationalLevel": { label: "description", id: "education_id" },
            "getIndustries": { label: "description", id: "industry_id" },
            "getEmploymentPositions": { label: "description", id: "position_id" },
            "getEmploymentStatus": { label: "description", id: "status_id" },
            "getGroupingDetails": { label: "description", id: "group_id" },
            "getIdentificationCards": { label: "description", id: "id" },
            "getEmployeeName": { label: "employee_name", id: "employee_id" },
            "getEmployeeWithId": { label: "employee_name", id: "employee_id" },
        };

        const propertyMapping = propertyMap[fName];

        if (propertyMapping) {
            let rawData;
            if (fName === "getEmploymentStatus") {
                rawData = { "bol_getone": 0, "status_id": 0, "bol_inactive": active, "description": inp.value };
            } else {
                rawData = { "bol_getone": 0, [propertyMapping.id]: 0, [propertyMapping.label]: inp.value };
            }

            var urlServiceTag = "Employee_ProfileProceduresControllers/Get/";

            if ($(inp).hasClass('groupings')) {
                urlServiceTag = "EntitiesCommon_GroupingsControllers/";
            } else if ($(inp).hasClass('entities')) {
                urlServiceTag = "EntitiesCommon_ProceduresControllers/";
            }

            let response = InvokeService(urlServiceTag + fName, "POST", formatRequestJSON(rawData));
            var response_data = JSON.parse(response.data);
            if (response_data.code == 200) {
                arrInfo = JSON.parse(response_data.jsonData);
                arrInfo = arrInfo.map(item => ({
                    label: formatStringNames(item[propertyMapping.label]),
                    id: item[propertyMapping.id],
                }));

                setAutocomplete(".accessory-inputs", arrInfo, functionName, params);
                inp.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
            } else if (response_data.code == 404) {
                inp.value = "No Data Found";    
            }
        }
    }
}

// THIS FUNCTION IS USED TO FETCH ADDRESS DATA (COUNTRY, PROVINCE, TOWN AND BARANGAY) BASED ON THE INPUTS NAME
function searchAddress(inp) {
    var type = inp.getAttribute("name");

    let propertyMap = {
        "country": { label: "country_name", id: "country_id", findInput: null },
        "province": { label: "province_state_name", id: "province_state_id", findInput: "country" },
        "town": { label: "town_name", id: "town_id", findInput: "province" },
        "barangay": { label: "barangay_district_name", id: "barangay_district_id", findInput: "town" }
    };

    let properties = propertyMap[type];

    if (!properties) {
        return;
    }

    const searchInputName = properties.findInput || type;

    let srcId = 0;
    const parentDiv = inp.closest('.address-div');

    if (!parentDiv) {
        return;
    }

    const inputElement = $(parentDiv).find(`[name="${searchInputName}"]`);

    if (!inputElement) {
        return;
    }

    srcId = inputElement.attr("id") || 0;

    const rawData = { "type": type, "id": srcId };
    const response = InvokeService("EntitiesCommon_ProceduresControllers/getAddressDetails", "POST", formatRequestJSON(rawData));
    const response_data = JSON.parse(response.data);
    if (response_data.code === 200) {
        arrInfo = JSON.parse(response_data.jsonData);
        for (let j = 0; j < arrInfo.length; j++) {
            arrInfo[j].label = formatStringNames(arrInfo[j][properties.label]);
            arrInfo[j].id = arrInfo[j][properties.id];
        }

        setAutocomplete(".address-input", arrInfo, 'resetAddressHeirInpVal', "");
        inp.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
    } else if (response_data.code === 404) {
        inp.value = "No Data Found";
    }
}

// THIS FUNCTION IS USED TO RESET THE HEIR OF THE FOCUSED CURRENT INPUT UPON VALUE CHANGE
function resetAddressHeirInpVal(inp) {
    var type = inp.getAttribute("name");

    if (type) {
        let propertyMap = {
            "country": { heirInput: null },
            "province": { heirInput: "province" },
            "town": { heirInput: "town" },
            "barangay": { heirInput: "barangay" }
        };

        var empty = false;
        for (let key in propertyMap) {
            if (key !== type) {
                if (empty) {
                    let properties = propertyMap[key];

                    let inpHeir = properties.heirInput;

                    if (inpHeir) {
                        const parentDiv = inp.closest('.address-div');

                        if (!parentDiv) {
                            return;
                        }

                        const heir = $(parentDiv).find(`[name="${inpHeir}"]`);

                        if (!heir) {
                            return;
                        }


                        heir.val("");
                        heir.removeAttr("id");
                    }
                }

            } else {
                empty = true;
            }
        }
    }

}

// THIS SETS THE MAX ATTRIBUTE OF THE DATE INPUT WITH THE ID "birthday" TO CURRENT DAY
const currentDate = new Date().toISOString().split("T")[0];
$("#birthday").attr("max", currentDate);

function calculateAge() {
    const birthdayInput = $("#birthday");
    const ageInput = $("#age");

    if (birthdayInput.val()) {
        const birthdate = new Date(birthdayInput.val());
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthdate.getFullYear();

        if (
            currentDate.getMonth() < birthdate.getMonth() ||
            (currentDate.getMonth() === birthdate.getMonth() &&
                currentDate.getDate() < birthdate.getDate())
        ) {
            age--;
        }

        ageInput.val(age);
    } else {
        ageInput.val("");
    }
}

// THIS FUNCTION POPULATES ENTITY NECCESSITIES INPUT FORMS (PERSON IDENTIFICATIONS OR COUNTER PARTIES) BASED ON WHAT type YOU HAVE SPECIFIED. IT WILL ALSO POPULATE THOSE INPUT FORMS TO THE container YOU HAVE SPECIFIED
function populateEntityNeccessities(intEntityId, process, type, container) {
    var rawData = { "entity_id": intEntityId };
    var response, message, necHtmlFunc = null;

    if (type === "counter-party-section") {
        response = InvokeService("EntitiesCommon_ProceduresControllers/getEntityCounterParties", "POST", formatRequestJSON(rawData));
        message = "No linked Counter Parties";
        necHtmlFunc = counterPartyHtml;
    } else if (type === "id-section") {
        response = InvokeService("EntitiesCommon_ProceduresControllers/getPersonIds", "POST", formatRequestJSON(rawData));
        message = "No linked Identification Cards";
        necHtmlFunc = identificationCardsHtml;
    } else {
        return;
    }

    var response_data = JSON.parse(response.data);
    if (response_data.code == 200) {
        var oData = JSON.parse(response_data.jsonData);
        if (oData.length > 0) {
            for (var i = 0; i < oData.length; i++) {
                addSectionDetails(container, oData[i], process, ('.' + type), necHtmlFunc, false);
            }
        }
    } else if (response_data.code == 404) {
        $(container).empty();
        $(container).append(noEntityAccDataMessage(message));
    }
}

// THIS FUNCTION IS USED TO POPULATE ENTITY DETAILS REQUIRED UPON DROPDOWN (SEARCH-SELECT) SELECT. THE KIND OF DETAILS THAT WILL BE POPULATED DEPENDS ON THE CLASS OF THE TARGER INPUT
function populateEntityValuesNecessary(inp, bolPerson) {
    var entityid, entityname, sex = null;

    var rawData = { "bol_getone": 1, "bol_person": parseInt(bolPerson), "description": "", "entity_id": inp.id };

    let response = InvokeService("EntitiesCommon_ProceduresControllers/getPersonDetails", "POST", formatRequestJSON(rawData));
    var response_data = JSON.parse(response.data);
    if (response_data.code == 200) {
        arrInfo = JSON.parse(response_data.jsonData);

        entityname = bolPerson == 1 ? arrInfo[0].fullname : arrInfo[0].nonperson_name;
        $(inp).val(entityname);
        $(inp).attr("title", entityname);

        var $entityContactsInput = $(inp).closest('.form-holder').find('input[name="entity-contacts"]');
        var mobilephone = arrInfo[0].mobilephone1 || arrInfo[0].mobilephone2;
        $entityContactsInput.val(mobilephone);
        $entityContactsInput.attr("title", mobilephone);

        var $entityAddressInput = $(inp).closest('.form-holder').find('input[name="entity-address"]');
        $entityAddressInput.val(arrInfo[0].address);
        $entityAddressInput.attr("title", arrInfo[0].address);

        if ($(inp).hasClass('entity-employee')) {
            $("#person-ids-container").empty();
            $("#birthday").val(arrInfo[0].birthdate);
            $("#sex").val(arrInfo[0].sex);
            $("#civilstatus").val(arrInfo[0].civilstatus);
            $("#home_country").val(arrInfo[0].country_name);
            $("#home_province").val(arrInfo[0].province_name);
            $("#home_town").val(arrInfo[0].town_name);
            $("#home_barangay").val(arrInfo[0].barangay_name);
            $("#home_street").val(arrInfo[0].adrs_house_street);
            $("#home_zip_code").val(arrInfo[0].zip_code);
            $("#employeeEntityId").val(arrInfo[0].entity_id);

            $(".currentcountry").val(arrInfo[0].country_name);
            $(".currentprovince").val(arrInfo[0].province_name);
            $(".currenttown").val(arrInfo[0].town_name);
            $(".currentbarangay").val(arrInfo[0].barangay_name);

            $(".currentcountry").attr("id", arrInfo[0].country_id);
            $(".currentprovince").attr("id", arrInfo[0].province_state_id);
            $(".currenttown").attr("id", arrInfo[0].town_id);
            $(".currentbarangay").attr("id", arrInfo[0].adrs_barangay);

            $("#currentstreet").val(arrInfo[0].adrs_house_street);
            $("#currentzipcode").val(arrInfo[0].zip_code);

            populateEntityNeccessities(arrInfo[0].entity_id, "View", "id-section", "#person-ids-container");

            calculateAge();
        } else if ($(inp).hasClass('entity-modify')) {
            $('#entity-form-div').hide('');
            $('#entity-info-div').show('');
            $('.person-only').hide();

            if (bolPerson == 1) {
                $('.person-only').show();

                entityid = arrInfo[0].person_id;

                if (arrInfo[0].sex == 0) {
                    sex = "Male";
                } else {
                    sex = "Female";
                }

                $("#view-birthdate").val(arrInfo[0].birthdate);
                $("#view-birthdate").attr("title", arrInfo[0].birthdate);
                $("#view-sex").val(sex);
                $("#view-sex").attr("title", sex);

            } else {
                entityid = arrInfo[0].nonperson_id;
            }

            $("#view-unique-identifier").val(paddString(entityid, 5));
            $("#view-unique-identifier").attr("title", paddString(entityid, 5));
            $("#view-entity-name").val(formatStringNames(entityname));
            $("#view-entity-name").attr("title", formatStringNames(entityname));
            $("#view-address").val(formatStringNames(arrInfo[0].address));
            $("#view-address").attr("title", formatStringNames(arrInfo[0].address));
            $("#view-grouping").val(formatStringNames(arrInfo[0].group_name));
            $("#view-grouping").attr("title", formatStringNames(arrInfo[0].group_name));

        }

        inp.id = arrInfo[0].entity_id;
        $(inp).attr("id", arrInfo[0].entity_id);
    }
}

/*------------------------------------------------------------------------------------------------------ OBJECT TEMPLATES FOR GETTING FORM APPENDINGS VALUE--------------------------------------------------------------------------------------*/

// EMPLOYMENT HISTORY OBJECT TEMPLATE
const employmentInfoTemplate = {
    "entity_id": { name: "companyName", source: "id" },
    "industry_id": { name: "industry", source: "id" },
    "position_id": { name: "position", source: "id" },
    "period_from": { name: "fromDate", source: "value" },
    "period_to": { name: "toDate", source: "value" }
};

// EDUCATIONAL BACKGROUND OBJECT TEMPLATE
const educationInfoTemplate = {
    "school_id": { name: "school", source: "id" },
    "education_id": { name: "educationLevel", source: "id" },
    "date_graduated": { name: "dateGraduated", source: "value" },
    "degree": { name: "degree", source: "value" },
    "town_id": { name: "town", source: "id" },
    "phone_01": { name: "phone01", source: "value" },
    "phone_02": { name: "phone02", source: "value" }
};

// FAMILY BACKGROUND OBJECT TEMPLATE
const familyInfoTemplate = {
    "entity_id": { name: "parent", source: "id" },
    "relation_id": { name: "parentRelation", source: "id" },
    "occupation_id": { name: "parentOccupation", source: "id" }
};

// EMERGENCY CONTACTS OBJECT TEMPLATE
const contactInfoTemplate = {
    "entity_id": { name: "emergencyContacts", source: "id" },
    "relation_id": { name: "contactRelation", source: "id" }
};

// BENEFICIARIES OBJECT TEMPLATE
const beneficiaryInfoTemplate = {
    "entity_id": { name: "beneficiary", source: "id" },
    "relation_id": { name: "beneficiaryRelation", source: "id" }
};

// DEPENDENTS OBJECT TEMPLATE
const dependentInfoTemplate = {
    "entity_id": { name: "dependent", source: "id" },
    "relation_id": { name: "dependentRelation", source: "id" }
};

// COUNTER PARTY OBJECT TEMPLATE
const counterPartyTemplate = {
    "counter_party_id": { name: "counterPartyInp", source: "id" }
};

// PERSON OTHER IDS OBJECT TEMPLATE
const personIdTemplate = {
    "card_id": { name: "cardInp", source: "id" },
    "id_reference": { name: "cardRef", source: "value" }
};

// EMPLOYEE NAME OBJECT TEMPLATE
const employeeNameTemplate = {
    "employee_id": { name: "employeeInp", source: "id" }
};

// EMPLOYEE NAME OBJECT TEMPLATE
const employeeWithPendingTemplate = {
    "employee_id": { name: "employeeWithPendingCessation", source: "id" },
    "bol_overwrite": { name: "employeeWithPendingCessation", source: "check" }
};

/*----------------------------------------------------------------------------------------------------------HTML CONTENT APPENDINGS FOR ADDABLE FORM---------------------------------------------------------------------------------------------*/

// FAMILY BACKGROUND HTML FORM APPENDINGS
function parentDetailsHtml(data, process) {
    const parentName = formatStringNames(data?.parent_name) || "";
    const parentRelation = formatStringNames(data?.relation) || "";
    const parentOccupation = formatStringNames(data?.occupation) || "";
    const parentId = data?.entity_id || "";
    const parentRelationId = data?.relation_id || "";
    const parentOccupationId = data?.occupation_id || "";

    var inputParent = $(
        '<div class="parent-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="form-group">' +
        '<label class="control-label mb-1" for="">FullName :</label>' +
        '<div class="input-group">' +
        '<input name="parent" autocomplete="off" value="' + parentName + '" id="' + parentId + '" title="' + parentName + '" type="text" class="form-control autoCaps validate entity-input" aria-required="true" aria-invalid="false" placeholder="Full Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;">' +
        '<i class="fa fa-plus parentBackground" ></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Relationship :</label>' +
        '<input name="parentRelation" autocomplete="off" value="' + parentRelation + '" id="' + parentRelationId + '" title="' + parentRelation + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getRelations" aria-required="true" aria-invalid="false" placeholder="Relation">' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Occupation :</label>' +
        '<div class="input-group">' +
        '<input class="form-control accessory-inputs autoCaps" value="' + parentOccupation + '" id="' + parentOccupationId + '" title="' + parentOccupation + '" name="parentOccupation" type="text" autocomplete="off" placeholder="Occupation" required="" data-query="getOccupation">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch" data-query="postOccupation" data-label="Occupation">' +
        '<i class="fa fa-plus occupationButton"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputParent.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputParent.find('input[name=parent]').focus();

    inputParent.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.parent-section').remove();
    });

    if (data) {
        if (process == "View") {
            inputParent.find('input').prop('readonly', true);
        }
    }

    return inputParent;
}

// EMERGENCY CONTACTS HTML FORM APPENDINGS
function contactDetailsHtml(data, process) {
    const contactName = formatStringNames(data?.emergency_contact_name) || "";
    const contactRelation = formatStringNames(data?.relation) || "";
    const contactNumber = data?.contact_number || "";
    const contactId = data?.entity_id || "";
    const contactRelationId = data?.relation_id || "";

    var inputEmergency = $(
        '<div class="emergency-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="form-group">' +
        '<label class="control-label mb-1" for="">FullName :</label>' +
        '<div class="input-group">' +
        '<input name="emergencyContacts" autocomplete="off" value="' + contactName + '" id="' + contactId + '" title="' + contactName + '" type="text" class="form-control autoCaps validate entity-input entity-1param" aria-required="true" aria-invalid="false" placeholder="Full Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch">' +
        '<i class="fa fa-plus"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Relationship :</label>' +
        '<input name="contactRelation" autocomplete="off" value="' + contactRelation + '" id="' + contactRelationId + '" title="' + contactRelation + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getRelations" aria-required="true" aria-invalid="false" placeholder="Relation">' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Contact :</label>' +
        '<div class="input-group">' +
        '<input class="form-control" value="' + contactNumber + '" title="' + contactNumber + '" name="entity-contacts" type="text" autocomplete="off" placeholder="Contact" required="" disabled>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputEmergency.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputEmergency.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.emergency-section').remove();
    });


    if (data) {
        if (process == "View") {
            inputEmergency.find('input').prop('readonly', true);
        }
    }

    return inputEmergency;
}

// BENEFICIARY HTML FORM APPENDINGS 
function beneficiaryDetailsHtml(data, process) {
    const beneficiaryName = formatStringNames(data?.beneficiary_name) || "";
    const beneficiaryRelation = formatStringNames(data?.relation) || "";
    const beneficiaryNumber = data?.contact_number || "";
    const beneficiaryAddress = formatStringNames(data?.address) || "";
    const beneficiaryId = data?.entity_id || "";
    const beneficiaryRelationId = data?.relation_id || "";

    var inputBeneficiary = $(
        '<div class="beneficiary-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="row form-group">' +
        '<div class="col-md-8">' +
        '<label class="control-label mb-1" for="">Full Name :</label>' +
        '<div class="input-group">' +
        '<input name="beneficiary" autocomplete="off" value="' + beneficiaryName + '" id="' + beneficiaryId + '" title="' + beneficiaryName + '" type="text" class="form-control autoCaps validate entity-input entity-2param" aria-required="true" aria-invalid="false" placeholder="Full Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch">' +
        '<i class="fa fa-plus beneficiaryButton"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label class="control-label mb-1" for="">Relationship :</label>' +
        '<input name="beneficiaryRelation" autocomplete="off" value="' + beneficiaryRelation + '" id="' + beneficiaryRelationId + '" title="' + beneficiaryRelation + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getRelations" aria-required="true" aria-invalid="false" placeholder="Relationship">' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-8">' +
        '<label class="control-label mb-1" for="">Address :</label>' +
        '<input name="entity-address" autocomplete="off" value="' + beneficiaryAddress + '" title="' + beneficiaryAddress + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Address" disabled>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label class="control-label mb-1" for="">Contact :</label>' +
        '<input name="entity-contacts" autocomplete="off" value="' + beneficiaryNumber + '" title="' + beneficiaryNumber + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Contact" disabled>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputBeneficiary.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputBeneficiary.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.beneficiary-section').remove();
    });


    if (data) {
        if (process == "View") {
            inputBeneficiary.find('input').prop('readonly', true);
        }
    }

    return inputBeneficiary;
}

// DEPENDENTS HTML FORM APPENDINGS
function dependentDetailsHtml(data, process) {
    const dependentsName = formatStringNames(data?.dependents_name) || "";
    const dependentsRelation = formatStringNames(data?.relation) || "";
    const dependentsNumber = data?.contact_number || "";
    const dependentsAddress = formatStringNames(data?.address) || "";
    const dependentsId = data?.entity_id || "";
    const dependentsRelationId = data?.relation_id || "";

    var inputDependents = $(
        '<div class="dependents-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="row form-group">' +
        '<div class="col-md-8">' +
        '<label class="control-label mb-1" for="">Full Name :</label>' +
        '<div class="input-group">' +
        '<input name="dependent" autocomplete="off" value="' + dependentsName + '" id="' + dependentsId + '" title="' + dependentsName + '" type="text" class="form-control autoCaps validate entity-input entity-2param" aria-required="true" aria-invalid="false" placeholder="Full Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;">' +
        '<i class="fa fa-plus beneficiaryButton"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label class="control-label mb-1" for="">Relationship :</label>' +
        '<input name="dependentRelation" autocomplete="off" value="' + dependentsRelation + '" id="' + dependentsRelationId + '" title="' + dependentsRelation + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getRelations" aria-required="true" aria-invalid="false" placeholder="Relationship">' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-8">' +
        '<label class="control-label mb-1" for="">Address :</label>' +
        '<input name="entity-address" autocomplete="off" value="' + dependentsAddress + '" title="' + dependentsAddress + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Address" disabled>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label class="control-label mb-1" for="">Contact :</label>' +
        '<input name="entity-contacts" autocomplete="off" value="' + dependentsNumber + '" title="' + dependentsNumber + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Contact" disabled>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputDependents.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputDependents.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.dependents-section').remove();
    });


    if (data) {
        if (process == "View") {
            inputDependents.find('input').prop('readonly', true);
        }
    }

    return inputDependents;
}

// EMPLOYMENT HISTORY HTML FORM APPENDINGS
function employmentHistoryHtml(data, process) {
    const companyName = formatStringNames(data?.employer_name) || "";
    const companyAddress = formatStringNames(data?.business_address) || "";
    const companyNumber = data?.contact_number || "";
    const industry = formatStringNames(data?.employer_industry) || "";
    const employmentPosition = formatStringNames(data?.employment_position) || "";
    const dateFrom = data?.period_from || "";
    const dateTo = data?.period_to || "";
    const companyId = data?.employer_entity_id || "";
    const industryId = data?.employer_industry_id || "";
    const positionId = data?.position_id || "";

    var inputEmploymentHistory = $(
        '<div class="employment-history-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="card-body">' +
        '<strong class="card-title">Company Information</strong>' +
        '<div class="card-body">' +
        '<div class="form-group">' +
        '<label class="control-label mb-1" for="">Company Name :</label>' +
        '<div class="input-group">' +
        '<input name="companyName" autocomplete="off" value="' + companyName + '" id="' + companyId + '" title="' + companyName + '" type="text" class="form-control autoCaps validate entity-input entity-2param nonperson" aria-required="true" aria-invalid="false" placeholder="Company Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;">' +
        '<i class="fa fa-plus beneficiaryButton"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-8">' +
        '<label class="control-label mb-1" for="">Address :</label>' +
        '<input name="entity-address" autocomplete="off" value="' + companyAddress + '" title="' + companyAddress + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Address" disabled>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<label class="control-label mb-1" for="">Contact :</label>' +
        '<input name="entity-contacts" autocomplete="off" value="' + companyNumber + '" title="' + companyNumber + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Contact" disabled>' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Industry :</label>' +
        '<div class="input-group">' +
        '<input name="industry" autocomplete="off" value="' + industry + '" id="' + industryId + '" title="' + industry + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getIndustries" aria-required="true" aria-invalid="false" placeholder="Industry">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch" data-query="postIndustries" data-label="Industry"><i class="fa fa-plus industryButton"></i></div>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Last Position Held :</label>' +
        '<div class="input-group">' +
        '<input name="position" autocomplete="off" value="' + employmentPosition + '" id="' + positionId + '" title="' + employmentPosition + '" type="text" class="form-control autoCaps validate accessory-inputs" data-query="getEmploymentPositions" aria-required="true" aria-invalid="false" placeholder="Last Position">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch" data-query="postEmploymentPositions" data-label="Employment Position"><i class="fa fa-plus positionButton"></i></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<strong class="card-title">Employment Date</strong>' +
        '<div class="card-body">' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">From :</label>' +
        '<input name="fromDate" autocomplete="off" value="' + dateFrom + '" type="date" class="form-control autoCaps validate" aria-required="true" aria-invalid="false" placeholder="mm/dd/yy">' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">To :</label>' +
        '<input name="toDate" autocomplete="off" value="' + dateTo + '" type="date" class="form-control autoCaps validate" aria-required="true" aria-invalid="false" placeholder="mm/dd/yy">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputEmploymentHistory.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputEmploymentHistory.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.employment-history-section').remove();
    });


    if (data) {
        if (process == "View") {
            inputEmploymentHistory.find('input').prop('readonly', true);
        }
    }

    return inputEmploymentHistory;
}

// EDUCATIONAL BACKGROUND HTML FORM APPENDINGS
function educationBackgroundHtml(data, process) {
    const educationLevel = formatStringNames(data?.education_level) || "";
    const schoolName = formatStringNames(data?.school_name) || "";
    const schoolCountry = formatStringNames(data?.country_name) || "";
    const schoolProvince = formatStringNames(data?.province_state_name) || "";
    const schoolTown = formatStringNames(data?.town_name) || "";
    const yearGraduated = data?.date_graduated || "";
    const degree = formatStringNames(data?.degree) || "";
    const phone1 = data?.phone_01 || "";
    const phone2 = data?.phone_02 || "";
    const educationId = data?.education_id || "";
    const schoolId = data?.school_id || "";
    const schoolCountryId = data?.country_id || "";
    const schoolProvinceId = data?.province_state_id || "";
    const schoolTownId = data?.town_id || "";

    var inputSchool = $(
        '<div class="education-section form-holder">' +
        (process === "Save" || process === "Edit" ?
            '<button class="parent-delete-section" style="background: transparent; border: none;">' +
            '<i class="fa fa-trash" style="color: red;"></i>' +
            '</button>' +
            '<strong class="card-title">Fill up this form</strong>' :
            '') +
        '<div class="card-body">' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Educational Level :</label>' +
        '<div class="input-group">' +
        '<input name="educationLevel" autocomplete="off" value="' + educationLevel + '" id="' + educationId + '" title="' + educationLevel + '" type="text" class="form-control autoCaps validate accessory-inputs" aria-required="true" data-query="getEducationalLevel" aria-invalid="false" placeholder="Educational Level">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">School Name :</label>' +
        '<div class="input-group">' +
        '<input name="school" autocomplete="off" value="' + schoolName + '" id="' + schoolId + '" title="' + schoolName + '" type="text" class="form-control autoCaps validate accessory-inputs" aria-required="true" data-query="getSchoolName" aria-invalid="false" placeholder="School Name">' +
        '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" id="btnSearch" data-query="postSchoolName" data-label="School Name"><i class="fa fa-plus schoolButton"></i></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<label class="control-label mb-1" for="">Address :</label>' +
        '<div class="row form-group address-div">' +
        '<div class="col-md-4">' +
        '<input name="country" autocomplete="off" value="' + schoolCountry + '" id="' + schoolCountryId + '" title="' + schoolCountry + '" type="text" class="form-control autoCaps validate address-input" aria-required="true" aria-invalid="false" placeholder="Country">' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input name="province" autocomplete="off" value="' + schoolProvince + '" id="' + schoolProvinceId + '" title="' + schoolProvince + '" type="text" class="form-control autoCaps validate address-input" aria-required="true" aria-invalid="false" placeholder="Province">' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input name="town" autocomplete="off" value="' + schoolTown + '" id="' + schoolTownId + '" title="' + schoolTown + '" type="text" class="form-control autoCaps validate address-input" aria-required="true" aria-invalid="false" placeholder="Town">' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Year Graduated :</label>' +
        '<div class="input-group">' +
        '<input name="dateGraduated" autocomplete="off" value="' + yearGraduated + '" type="date" class="form-control autoCaps validate" aria-required="true" aria-invalid="false" placeholder="Year Graduated">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Degree :</label>' +
        '<input name="degree" autocomplete="off" value="' + degree + '" type="text" class="form-control autoCaps" aria-required="true" aria-invalid="false" placeholder="Degree">' +
        '</div>' +
        '</div>' +
        '<div class="row form-group">' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Phone Number 01 :</label>' +
        '<div class="input-group">' +
        '<input name="phone01" autocomplete="off" value="' + phone1 + '" type="text" class="form-control" aria-required="true" aria-invalid="false" placeholder="Optional">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="control-label mb-1" for="">Phone Number 02 :</label>' +
        '<input name="phone02" autocomplete="off" value="' + phone2 + '" type="text" class="form-control" aria-required="true" aria-invalid="false" placeholder="Optional">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputSchool.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputSchool.find('button').click(function (event) {
        event.preventDefault();
        $(this).closest('.education-section').remove();
    });


    if (data) {
        if (process == "View") {
            inputSchool.find('input').prop('readonly', true);
        }
    }

    return inputSchool;

}

// PERSON OTHER IDS HTML FORM APPENDINGS
function identificationCardsHtml(data, process) {
    const idName = formatStringNames(data?.card_name) || "";
    const id = data?.card_id || "";
    const idReference = data?.reference || "";

    var inputIds = $(
        '<div class="row form-group id-section">' +
        '<div class="col-md-6">' +
        '<div class="input-group">' +
        '<input name="cardInp" autocomplete="off" type="text" value="' + idName + '" id="' + id + '" title="' + idName + '" class="form-control entities autoCaps accessory-inputs validate" aria-required="true" aria-invalid="false" placeholder="ID Name" data-query="getIdentificationCards">' +
        (process === "Save" || process === "Edit" ?
            '<div class="input-group-addon show-modal-div" style="background-color:#007bff; color: white;cursor: pointer;" data-query="postIdentificationCards" data-label="Identification Card">' +
            '<i class="fa fa-plus"></i>' +
            '</div>' :
            '') +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<div class="input-group">' +
        '<input name="cardRef" autocomplete="off" type="text" value="' + idReference + '" title="' + idReference + '" class="form-control validate" aria-required="true" aria-invalid="false" placeholder="Identification Number">' +
        (process === "Save" || process === "Edit" ?
            '<div class="input-group-addon delete-form" style="background-color:red; color: white;cursor: pointer;">' +
            '<i class="fa fa-trash-o"></i>' +
            '</div>' :
            '') +
        '</div>' +
        '<small class="help-block form-text" style="display:none;color:red;">Input value must be 30 characters or less.</small>' +
        '</div>' +
        '</div>'
    );

    inputIds.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    const cardRefInput = inputIds.find('input[name="cardRef"]');
    const helpText = cardRefInput.closest('.col-md-6').find('.help-block.form-text');

    cardRefInput.on('input', function (event) {
        if (this.value.length > 30) {
            helpText.show();
            cardRefInput.addClass("delete-inp");
        } else {
            helpText.hide();
            cardRefInput.removeClass("delete-inp");
        }
    });


    inputIds.find('div.delete-form').click(function (event) {
        event.preventDefault();

        var container = $(this).closest('#enity-neccessity-container');
        var sectionCount = container.find('.id-section').length;

        if (sectionCount === 1) {
            container.empty();
            $(container).append(noEntityAccDataMessage("No linked Identification Cards"));
        }
        $(this).closest('.id-section').remove();
    });

    if (data) {
        if (process == "View") {
            inputIds.find('input').prop('readonly', true);
        }
    }

    return inputIds;
}

// ENTITY COUNTER PARTIES HTML FORM APPENDINGS
function counterPartyHtml(data, process) {
    const counterPartyName = formatStringNames(data?.counter_party_name) || "";
    const counterPartyId = data?.counter_party_id || "";

    var inputCounterParty = $(
        '<div class="row form-group counter-party-section">' +
        '<div class="col-md-12">' +
        '<div class="input-group">' +
        '<input type="text" autocomplete="off" value="' + counterPartyName + '" id="' + counterPartyId + '" title="' + counterPartyName + '" name="counterPartyInp" placeholder="Counter Party..." class="form-control autoCaps entity-input validate">' +
        (process === "Save" || process === "Edit" ?
            '<div class="input-group-addon delete-form" style="background-color:red; color: white;cursor: pointer;">' +
            '<i class="fa fa-trash-o"></i>' +
            '</div>' :
            '') +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputCounterParty.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputCounterParty.find('div.delete-form').click(function (event) {
        event.preventDefault();

        var container = $(this).closest('#enity-neccessity-container');
        var sectionCount = container.find('.counter-party-section').length;

        if (sectionCount === 1) {
            container.empty();
            $(container).append(noEntityAccDataMessage("No linked Counter Parties"));
        }
        $(this).closest('.counter-party-section').remove();
    });

    if (data) {
        if (process == "View") {
            inputCounterParty.find('input').prop('readonly', true);
        }
    }

    return inputCounterParty;
}

// EMPLOYEE NAMES HTML FORM APPENDINGS
function employeeHtml(data, process) {
    const employeeName = formatStringNames(data?.employee_name) || "";
    const employeeId = data?.employee_id || "";

    var inputEmployee = $(
        '<div class="row form-group employee-section">' +
        '<div class="col-md-12">' +
        '<div class="input-group">' +
        '<input type="text" autocomplete="off" value="' + employeeName + '" id="' + employeeId + '" title="' + employeeName + '" name="employeeInp" placeholder="Select Employee..." class="form-control autoCaps accessory-inputs validate" data-query="getEmployeeWithId">' +
        (process === "Save" || process === "Edit" ?
            '<div class="input-group-addon delete-form" style="background-color:red; color: white;cursor: pointer;">' +
            '<i class="fa fa-trash-o"></i>' +
            '</div>' :
            '') +
        '</div>' +
        '</div>' +
        '</div>'
    );

    inputEmployee.find('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    inputEmployee.find('div.delete-form').click(function (event) {
        event.preventDefault();
        $(this).closest('.employee-section').remove();
    });

    if (data) {
        if (process == "View") {
            inputEmployee.find('input').prop('readonly', true);
        }
    }

    return inputEmployee;
}

// EMPLOYEE WITH PENDING CESSATION HTML FORM APPENDINGS
function employeeWithPendingCessationHtml(data, process) {
    const employeeName = formatStringNames(data?.employee_name) || "";
    const employeeId = data?.employee_id || "";

    var inputEmployee = $(
        '<div class="checkbox form-check employee-with-pending-section">' +
        '<label for="' + employeeId + '" class="form-check-label">' +
        '<input type="checkbox" id="' + employeeId + '" name="employeeWithPendingCessation" class="form-check-input employee-overwrite-chk-bx">' + employeeName +
        '</label>' +
        '</div>'
    );

    return inputEmployee;
}

/*-----------------------------------------------------------------------------------------------------------FUNCTIONS FOR MODIFYING DATABASE DATAS----------------------------------------------------------------------------------------------*/

