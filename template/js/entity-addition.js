$(document).ready(function () {
    setAutocomplete(".accessory-inputs", [], '', '');
    setAutocomplete(".address-input", [], '', '');
    setAutocomplete(".entity-input", [], "", '');

    SetInputAutocomplete(".accessory-inputs", "searchDropdowns", "");
    SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
    SetInputAutocomplete(".address-input", "searchAddress", "");
});


document.write(
`<div class="modal fade child-modal" id="addEntityChoicesModal" tabindex="-1" role="dialog" aria-labelledby="entity-label" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="add-edit-entity-label">Entity Addition Choices</h5>
                <button type="button" class="close entityCloseModal" data-dismiss="modal" aria-label="Close" onclick="closeModal();">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-pills nav-justified mb-3 mt-2">
                    <li class="nav-item" style="border: 1px solid white;">
                        <a class="nav-link active prsn-tab" href="#" data-toggle="modal" data-dismiss="modal" onclick="closeModal();">Person</a>
                    </li>
                    <li class="nav-item" style="border: 1px solid white;">
                        <a class="nav-link active nonprsn-tab" href="#" data-toggle="modal" data-dismiss="modal" onclick="closeModal();">Non-Person</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="modal fade child-modal" id="addEntityNonPersonModal" tabindex="-1" role="dialog" aria-labelledby="entity-label" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="add-edit-entity-label">Add Non-Person</h5>
                <button type="button" class="close entityCloseModal" data-dismiss="modal" aria-label="Close" onclick="closeModal();">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="entt-nonp-frm">
                    <div id="entity-form-div">
                        <!-- PERSON ONLY INPUTS -->
                        <div class="card-header">
                            <div class="card-body">
                                <!-- NON-PERSON ONLY INPUTS -->
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-nonp-cmpnme" class="form-control-label"><strong>Company Name:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" required id="entt-nonp-cmpnme" autocomplete="off" name="text-input" placeholder="Company Name..." class="form-control autoCaps modify-entity-input validate">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label class="form-control-label"><strong>Contact Person:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="input-group">
                                            <input type="search" required autocomplete="off" name="text-input" placeholder="Select Contact Person 1..." class="entt-nonp-cont1 entity-input form-control autoCaps modify-entity-input validate">
                                            <div class="input-group-addon" style="background-color:#007bff; color: white;cursor: pointer;" data-toggle="modal" data-target="#addEntityPersonModal">
                                                <i class="fa fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <div class="input-group">
                                            <input type="search" required autocomplete="off" name="text-input" placeholder="Select Contact Person 2..." class="entt-nonp-cont2 entity-input form-control autoCaps modify-entity-input">
                                            <div class="input-group-addon" style="background-color:#007bff; color: white;cursor: pointer;"  data-toggle="modal" data-target="#addEntityPersonModal">
                                                <i class="fa fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- ENTITY COMMON INPUTS -->
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label class="form-control-label"><strong> Current Address:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                    </div>
                                </div>
                                <div class="address-div">
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="country" placeholder="Select Country..." class="entt-nonp-cntry form-control en address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="province" placeholder="Select Province/State" class="entt-nonp-prvnce form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="town" placeholder="Select Town/Municipality..." class="entt-nonp-twn form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col col-md-9">
                                            <input type="search" autocomplete="off" name="barangay" placeholder="Select Barangay/District..." class="entt-nonp-brgy form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="entt-nonp-zpcd" autocomplete="off" name="text-input" placeholder="Zipcode..." class="form-control modify-entity-input">
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="entt-nonp-hstrt" autocomplete="off" name="text-input" placeholder="Bldg./House#Street..." class="form-control modify-entity-input autoCaps validate">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-nonp-emladd1" class="form-control-label"><strong> Email Address:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-emladd1" autocomplete="off" name="text-input" placeholder="Email Address 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-emladd2" autocomplete="off" name="text-input" placeholder="Email Address 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-emladd3" autocomplete="off" name="text-input" placeholder="Email Address 3..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-nonp-telnum1" class="form-control-label"><strong>Landline Number:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-telnum1" autocomplete="off" name="text-input" placeholder="Landline Number 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-telnum2" autocomplete="off" name="text-input" placeholder="Landline Number 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-nonp-mblnum1" class="form-control-label"><strong>Mobile Number:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-mblnum1" autocomplete="off" name="text-input" placeholder="Mobile Number 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9"> 
                                        <input type="text" id="entt-nonp-mblnum2" autocomplete="off" name="text-input" placeholder="Mobile Number 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-nonp-tin" class="form-control-label"><strong>Tax Identification:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-nonp-tin" autocomplete="off" name="text-input" placeholder="Tax Identification..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label class="form-control-label"><strong>Group:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="search" autocomplete="off" name="text-input" placeholder="Group..." class="entt-nonp-grp form-control groupings modify-entity-input autoCaps accessory-inputs" data-query="getGroupingDetails">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group"></div>
                        <div class="card-header">
                            <div class="card-body">
                                <div class="form-group">
                                    <button class="btn btn-primary" id="add-nonp-other-ids">+ Other IDs</button>
                                </div>
                                <div class="form-group" id="nonp-other-ids-container"></div>
                            </div>
                        </div>
                        <div class="row form-group"></div>
                        <div class="card-header">
                            <div class="card-body">
                                <div class="form-group">
                                    <button class="btn btn-primary" id="add-nonp-counter-party">+ Counter Party</button>
                                </div>
                                <div class="form-group" id="nonp-counter-party-container">
                                </div>
                            </div>
                        </div> 
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal();">Cancel</button>
                <button type="button" class="btn btn-success" id="entt-nonp-sv-btn" >Save</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade child-modal" id="addEntityPersonModal" tabindex="-1" role="dialog" aria-labelledby="entity-label" data-backdrop="static">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="add-edit-entity-label">Add Person</h5>
                <button type="button" class="close entityCloseModal" data-dismiss="modal" aria-label="Close" onclick="closeModal();">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="entt-p-frm">
                    <div id="entity-form-div">
                        <!-- PERSON ONLY INPUTS -->
                        <div class="card-header">
                            <div class="card-body">
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-lstnme" class="form-control-label"><strong>Last Name:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-lstnme" required="" autocomplete="off" name="text-input" placeholder="Last Name..." class="form-control autoCaps validate modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-frstnme" class="form-control-label"><strong>First Name:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-frstnme" required="" autocomplete="off" name="text-input" placeholder="First Name..." class="form-control autoCaps validate modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-mdlnme" class="form-control-label"><strong>Middle Name:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-mdlnme" required="" autocomplete="off" name="text-input" placeholder="Middle Name..." class="form-control autoCaps validate modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-dteofbrth" class="form-control-label"><strong>Date of Birth</strong>:</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="date" id="entt-p-dteofbrth" autocomplete="off" name="text-input" placeholder="0.00" class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="gender" class="form-control-label"><strong>Gender:</strong></label>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input type="radio" id="entt-p-mle" name="gender" value="male" class="form-check-input modify-entity-input">
                                            <label for="entt-p-mle" class="form-check-label">Male</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input type="radio" id="entt-p-fmle" name="gender" value="female" class="form-check-input modify-entity-input">
                                            <label for="entt-p-fmle" class="form-check-label">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-cvlsts" class="form-control-label"><strong>Civil Status:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <select name="status" id="entt-p-cvlsts" class="form-control modify-entity-input">
                                            <option value="0">Please Select</option>
                                            <option value="1">Single</option>
                                            <option value="2">Married</option>
                                            <option value="3">Widowed</option>
                                            <option value="4">Separated</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- ENTITY COMMON INPUTS -->
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label class="form-control-label"><strong> Current Address:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                    </div>
                                </div>
                                <div class="address-div">
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="country" placeholder="Select Country..." class="entt-p-cntry form-control en address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="province" placeholder="Select Province/State" class="entt-p-prvnce form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col-md-9">
                                            <input type="search" autocomplete="off" name="town" placeholder="Select Town/Municipality..." class="entt-p-twn form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-3">
                                        </div>
                                        <div class="col col-md-9">
                                            <input type="search" autocomplete="off" name="barangay" placeholder="Select Barangay/District..." class="entt-p-brgy form-control address-input modify-entity-input autoCaps validate">
                                        </div>
                                    </div> 
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="entt-p-zpcd" autocomplete="off" name="text-input" placeholder="Zipcode..." class="form-control modify-entity-input">
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="entt-p-hstrt" autocomplete="off" name="text-input" placeholder="Bldg./House#Street..." class="form-control modify-entity-input autoCaps validate">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-emladd1" class="form-control-label"><strong> Email Address:</strong></label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-emladd1" autocomplete="off" name="text-input" placeholder="Email Address 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-emladd2" autocomplete="off" name="text-input" placeholder="Email Address 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-emladd3" autocomplete="off" name="text-input" placeholder="Email Address 3..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-telnum1" class="form-control-label"><strong>Landline Number:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-telnum1" autocomplete="off" name="text-input" placeholder="Landline Number 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-telnum2" autocomplete="off" name="text-input" placeholder="Landline Number 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-mblnum1" class="form-control-label"><strong>Mobile Number:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-mblnum1" autocomplete="off" name="text-input" placeholder="Mobile Number 1..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-9"> 
                                        <input type="text" id="entt-p-mblnum2" autocomplete="off" name="text-input" placeholder="Mobile Number 2..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="entt-p-tin" class="form-control-label"><strong>Tax Identification:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="entt-p-tin" autocomplete="off" name="text-input" placeholder="Tax Identification..." class="form-control modify-entity-input">
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label class="form-control-label"><strong>Group:</strong> </label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="search" autocomplete="off" name="text-input" placeholder="Group..." class="entt-p-grp form-control groupings modify-entity-input autoCaps accessory-inputs" data-query="getGroupingDetails">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group"></div>
                        <div class="card-header">
                            <div class="card-body">
                                <div class="form-group">
                                    <button class="btn btn-primary" id="add-p-other-ids">+ Other IDs</button>
                                </div>
                                <div class="form-group" id="p-other-ids-container"></div>
                            </div>
                        </div>
                        <div class="row form-group"></div>
                        <div class="card-header">
                            <div class="card-body">
                                <div class="form-group">
                                    <button class="btn btn-primary" id="add-p-counter-party">+ Counter Party</button>
                                </div>
                                <div class="form-group" id="p-counter-party-container">
                                </div>
                            </div>
                        </div> 
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="entityModalCancelBtn" onclick="closeModal();">Cancel</button>
                <button type="button" class="btn btn-success" id="entt-p-sv-btn">Save</button>
            </div>
        </div>
    </div>
</div>
`);

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

function GetURL(employee) {
    if(employee == 1){
        return "http://192.168.4.120/employee_profile/";
        //return window.location.origin + "/employee_profile/";
    }else{
        return "http://192.168.4.120/entities_commons/";
        //return window.location.origin + "/entities_commons/";
    } 
}

class ServiceResponse {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

}

function InvokeService(controller, paramMethod, paramBody) {
    var bolEmployee = 0;
    if (controller.indexOf("Employee_Profile") !== -1) {
        bolEmployee = 1;
    } 
    var url = GetURL(bolEmployee) + controller;

    var serviceResponse;
    var xhttp = new XMLHttpRequest();
    try {
        serviceResponse = new ServiceResponse(0, "", null);
        xhttp.open(paramMethod, url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("intSubId", subscriberID());
        //xhttp.setRequestHeader("intSubId", 174);
        xhttp.send(paramBody);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {}
        };

    } catch (e) {
        console.log(e)
    }
    serviceResponse.code = xhttp.status;

    if (xhttp.status == 200) {
        serviceResponse.data = xhttp.responseText;
        serviceResponse.message = "Success";
    } else {
        if (xhttp.statusText == "") {
            if (xhttp.status == 404) {
                serviceResponse.message = "Not found";
            } else if (xhttp.status == 500) {
                serviceResponse.message = "Internal Error";
            } else if (xhttp.status == 401) {
                serviceResponse.message = "Unauthorized access";
            } else {
                serviceResponse.message = "Service unavailable at this moment. Please try again later";
            }
        } else {
            serviceResponse.message = xhttp.statusText;
        }

    }

    return serviceResponse;

}

function closeModal() {
    $(document).find('.child-modal').on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });
}

function formatRequestJSON(json){
    var frmtjson = JSON.stringify(json);

    return frmtjson;
}

function ExecuteFunction(functionname, params, inpElement){
    var arr = params.split(",");
    var args = new Array();

    for (var i = 0; i < arr.length; i++)
        args.push(arr[i]);

    
    if(args.length < 1){
        window[functionname](inpElement);
    }else{
        args.unshift(inpElement);
        window[functionname].apply(this, args);
    }
}

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

function highlightForm(formContainer, formSection, bolHighlight) {
    const target = $(formContainer + ' ' + formSection + ':last');

    if (bolHighlight) {
        target.find('input:first').focus().end().css('background-color', 'rgba(0, 0, 0, 0.04)');
        $(formContainer + ' ' + formSection + ':not(:last)').css('background-color', 'transparent');
    } else {
        target.find('input:first').focus();
    }
}

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
    } else {
        SetInputAutocomplete(".entity-input", "searchEntityForProfiling", "");
    }

}

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
                info[key] = value;
            }
        }

        data.push(info);
    });

    return data;
}

function searchEntityForProfiling(inp) {
    var bolPerson = $(inp).hasClass('nonperson') ? 0 : 1;
    var bolEmployee = $(inp).hasClass('entity-employee') ? 1 : 0;
    if (inp.value.length > 0) {
        var rawData = { "bol_getone": 0, "bol_person": bolPerson, "bol_employee": bolEmployee, "description": inp.value, "entity_id": 0 };

        let response = InvokeService("EntitiesCommon_ProceduresControllers/getPersonDetails", "POST", formatRequestJSON(rawData));
        var response_data = JSON.parse(response.data);
        if (response_data.code == 200) {
            arrInfo = JSON.parse(response_data.jsonData);
            for (var i = 0; i < arrInfo.length; i++) {
                arrInfo[i].label = $(inp).hasClass('nonperson') ? arrInfo[i].nonperson_name : arrInfo[i].fullname;
                arrInfo[i].id = arrInfo[i].entity_id;
                arrInfo[i].label = $(inp).hasClass('entity-modify') ? formatSearchName(arrInfo[i].id, arrInfo[i].label) : formatStringNames(arrInfo[i].label);
            }
            setAutocomplete(".entity-input", arrInfo, "", String(bolPerson));
            inp.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));

        } else if (response_data.code == 404) {
            inp.value = "No Data Found";
        }
    }
}

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

$(document).on("click", ".entity-add", function (event) {
    $('#addEntityChoicesModal').modal('show');

    $('.prsn-tab').click(function (e) {
        e.preventDefault();
        $('#entt-p-frm')[0].reset();
        $('#addEntityPersonModal').modal('show');
        storeEntity(event.target, '#entt-p-sv-btn', 1);
        $('#addEntityPersonModal').find(".validate").removeClass("is-invalid");
    });

    $('.nonprsn-tab').click(function (e) {
        e.preventDefault();
        $('#entt-nonp-frm')[0].reset();
        $('#addEntityNonPersonModal').modal('show');
        storeEntity(event.target, '#entt-nonp-sv-btn', 0);
        $('#addEntityNonPersonModal').find(".validate").removeClass("is-invalid");
    });

});

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

const counterPartyTemplate = {
    "counter_party_id": { name: "counterPartyInp", source: "id" }
};

const personIdTemplate = {
    "card_id": { name: "cardInp", source: "id" },
    "id_reference": { name: "cardRef", source: "value" }
};

$(document).ready(function () {
    $('#add-nonp-other-ids').click(function (event) {
        event.preventDefault();
        addSectionDetails("#nonp-other-ids-container", null, "Save", '.id-section', identificationCardsHtml, false);
    });
});

$(document).ready(function () {
    $('#add-nonp-counter-party').click(function (event) {
        event.preventDefault();
        addSectionDetails("#nonp-counter-party-container", null, "Save", '.counter-party-section', counterPartyHtml, false);
    });
});

$(document).ready(function () {
    $('#add-p-other-ids').click(function (event) {
        event.preventDefault();
        addSectionDetails("#p-other-ids-container", null, "Save", '.id-section', identificationCardsHtml, false);
    });
});

$(document).ready(function () {
    $('#add-p-counter-party').click(function (event) {
        event.preventDefault();
        addSectionDetails("#p-counter-party-container", null, "Save", '.counter-party-section', counterPartyHtml, false);
    });
});

function storeEntity(btn, saveBtn, bolPerson){
    var parentDiv = $(btn).closest('.input-group');
    var modal = $(saveBtn).closest('.modal');

    var targetInp = parentDiv.find('input[type="search"]');
    var targetInpId = targetInp.attr('id');

    $(saveBtn).off('click');
    $(saveBtn).click(function (event) {
        event.preventDefault();
        var valid = true;

        var storedObj = processStoringObject(bolPerson);
    
        var populateName = (bolPerson == 1 ? 
            storedObj.last_name+', '+storedObj.first_name+' '+storedObj.middle_name : 
            storedObj.nonperson_name
        );

        modal.find(".validate").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                valid = false;
            } else {
                $(this).removeClass("is-invalid");
            }
        });
    
        if (valid) {
            targetInp.val(populateName);
            // window['$'+targetInpId] = JSON.stringify(storedObj);
            sessionStorage.setItem(targetInpId, JSON.stringify(storedObj));
            modal.modal('hide');
        }
        
    });

}

function processStoringObject(bolPerson){
    var sex = $("#entt-p-mle").prop("checked") ? 0 : 1;
    var n = (bolPerson == 1 ? '' : 'non');

    var Obj = {
        "bol_person": bolPerson,
        "bol_counter_party": 1,
        "last_name": (bolPerson == 1 ? formatStringNames($("#entt-p-lstnme").val()) : null),
        "first_name": (bolPerson == 1 ? formatStringNames($("#entt-p-frstnme").val()) : null),
        "middle_name": (bolPerson == 1 ? formatStringNames($("#entt-p-mdlnme").val()) : null),
        "sex": (bolPerson == 1 ? sex : null),
        "birth_date": (bolPerson == 1 ? ($("#entt-p-dteofbrth")?.val() || '0001-01-01' ): null),
        "civil_status": (bolPerson == 1 ? $("#entt-p-cvlsts").val() : null),
        "nonperson_name": (bolPerson == 0 ? $("#entt-nonp-cmpnme").val() : null),
        "contact_person1": (bolPerson == 0 ? $(".entt-nonp-cont1").attr("id") : null),
        "contact_person2": (bolPerson == 0 ? $(".entt-nonp-cont2").attr("id") : null),
        "tax_identification": $("#entt-"+n+"p-tin").val(),
        "house_street": formatStringNames($("#entt-"+n+"p-hstrt").val()),
        "barangay_id": $(".entt-"+n+"p-brgy").attr('id'),
        "zip_code": $("#entt-"+n+"p-zpcd").val(),
        "email_address1": $("#entt-"+n+"p-emladd1").val(),
        "email_address2": $("#entt-"+n+"p-emladd2").val(),
        "email_address3": $("#entt-"+n+"p-emladd3").val(),
        "land_phone1": $("#entt-"+n+"p-telnum1").val(),
        "land_phone2": $("#entt-"+n+"p-telnum2").val(),
        "mobile_phone1": $("#entt-"+n+"p-mblnum1").val(),
        "mobile_phone2": $("#entt-"+n+"p-mblnum2").val(),
        "posted_by": 1,
        "group_id": (parseInt($(".entt-"+n+"p-grp").attr("id")) > 0 ? $(".entt-"+n+"p-grp").attr("id") : null),
        "counter_parties": fetchData('#'+n+'p-counter-party-container','.counter-party-section', counterPartyTemplate),
        "person_ids": fetchData('#'+n+'p-other-ids-container','.id-section', personIdTemplate)
    }

    return Obj;
}

function isJSONValid(jsonData) {
    if(jsonData !== undefined){
        try {
            JSON.parse(jsonData);
            return true;
        } catch (error) {
            return false;
        }
    }
}

function getObjStored(id){
    var variable = sessionStorage.getItem(id);
    var obj = null;
    if(variable !== undefined){
        var obj = isJSONValid(variable) ? JSON?.parse(variable) : null;
    }
        
    return obj;
}

