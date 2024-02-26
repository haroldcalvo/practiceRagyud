
//JSONObject example for unit population
const units = [
    {
      "unit.description": "Branch 01 - Lahug",
      "unit.id": 1,
      "main.dept": [
        {
          "main.dept.descrtion": "Sales",
          "main.dept.id": 1
        },
        {
          "main.dept.descrtion": "Collection",
          "main.dept.id": 2
        }
      ]
    },
    {
      "unit.description": "Branch 02 - Opon(Lapu-lapu)",
      "unit.id": 2,
      "main.dept": [
        {
          "main.dept.descrtion": "Administration",
          "main.dept.id": 3
        },
        {
          "main.dept.descrtion": "Operation",
          "main.dept.id": 4
        }
      ]
    },
    {
      "unit.description": "Branch 03 - Balamban",
      "unit.id": 3,
      "main.dept": []
    }
  ];

//JSONObject example for main dept. population
const mainDept = [
    {
      "main.dept.descrtion": "Sales",
      "main.dept.id": 1,
      "unit": [
        {
          "unit.description": "Branch 01 - Lahug",
          "unit.id": 1
        },
        {
          "unit.description": "Branch 02 - Opon(Lapu-lapu)",
          "unit.id": 2
        },
        {
          "unit.description": "Branch 03 - Balamban",
          "unit.id": 3
        }
      ]
    },
    {
      "main.dept.descrtion": "Collection",
      "main.dept.id": 2,
      "unit": [
        {
          "unit.description": "Branch 01 - Lahug",
          "unit.id": 1
        }
      ]
    },
    {
      "main.dept.descrtion": "Administration",
      "main.dept.id": 3,
      "unit": [
        {
          "unit.description": "Branch 02 - Opon(Lapu-lapu)",
          "unit.id": 2
        },
        {
          "unit.description": "Branch 03 - Balamban",
          "unit.id": 3
        }
      ]
    },
    {
      "main.dept.descrtion": "Operation",
      "main.dept.id": 4,
      "unit": []
    },
    {
      "main.dept.descrtion": "Information Technology",
      "main.dept.id": 5,
      "unit": [
        {
          "unit.description": "Branch 01 - Lahug",
          "unit.id": 1
        },
        {
          "unit.description": "Branch 03 - Balamban",
          "unit.id": 3
        }
      ]
    }
];

let card_unit = `#card-unit`;
let card_department = `#card-department`;
let all_unit = `#all-unit`;
let all_department = `#all-department`;

function appendMessageUnitMoreThanOne () {
  let length = checkboxesCheckedCountDept();
  if (length > 1) {
    $(card_unit).children().remove();
    $(card_unit).append(`
          <div class="row form-group">
              <div class="col-12">
                  <strong>Due to various department, it is inaccessible to select a unit.</strong>
              </div>
          </div>
          `);
    $(all_unit).prop('checked', false);
    $(all_unit).attr('disabled',true);
  } else if (length == 1 || length == 0){
    $(all_unit).removeAttr('disabled');
  }
}
function appendMessageDeptMoreThanOne () {
  let length = checkboxesCheckedCountUnit();
  if (length > 1) {
    $(card_department).children().remove();
    $(card_department).append(`
          <div class="row form-group">
              <div class="col-12">
                  <strong>Due to various unitsss, it is inaccessible to select a department.</strong>
              </div>
          </div>
          `);
    $(all_department).prop('checked', false);
    $(all_department).attr('disabled',true);
  } else if (length == 1 || length == 0){
    $(all_department).removeAttr('disabled');
  }
}

$(all_unit).click(function(){
  if ($(this).prop("checked")) {
    $(`[name='unitNameCheckBox']`).prop('checked', true);
    appendMessageDeptMoreThanOne();
  } else {
    $(`[name='unitNameCheckBox']`).prop('checked', false);
    appendMessageDeptMoreThanOne();
    let countDept = checkboxesCheckedCountDept();
    if (countDept == 0) {
      appendDepartment(mainDept,true);
    }
  }
});

$(all_department).click(function(){
  if ($(this).prop("checked")) {
    $(`[name='deptNameCheckBox']`).prop('checked', true);
    appendMessageUnitMoreThanOne();
  } else {
    $(`[name='deptNameCheckBox']`).prop('checked', false);
    appendMessageUnitMoreThanOne();
    let countUnit = checkboxesCheckedCountUnit();
    if (countUnit == 0) {
      appendUnit(units,true);
    }
  }
});

function appendUnit(in_unit,in_all) {

  let unit_checkbox = ``;
  
  if (in_all) {
    unit_checkbox = `class="unit_checkbox"`;
  }

  $(card_unit).children().remove();
  let length_of_units = in_unit.length;
  if (length_of_units == 0) {
    $(card_unit).append(`
        <div class="row form-group">
            <div class="col-12">
                <strong>No unit available</strong>
            </div>
        </div>
        `);
  }
  in_unit.forEach(data_units => {
  
      let unit_description = data_units["unit.description"];
      let unit_id = data_units["unit.id"];
      let checkbox_label_identifier = unit_id+unit_description.substring(0,1).toUpperCase();
  
      $(card_unit).append(`
          <div class="row form-group">
              <div class="col-md-6">
                  <input id="${checkbox_label_identifier}" ${unit_checkbox} name="unitNameCheckBox" type="checkbox" data-description="${unit_description}" data-id="${unit_id}"/>&nbsp;<label for="${checkbox_label_identifier}">${unit_description}</label>
              </div>
          </div>
          `);
  });
}

function appendDepartment(in_mainDept,in_all) {

  let dept_checkbox = ``;
  
  if (in_all) {
    dept_checkbox = `class="dept_checkbox"`;
  }

  $(card_department).children().remove();
  let length_of_mainDept = in_mainDept.length;
  if (length_of_mainDept == 0) {
    $(card_department).append(`
        <div class="row form-group">
            <div class="col-12">
                <strong>No department available</strong>
            </div>
        </div>
        `);
  }
  in_mainDept.forEach(data_mainDept => {

      let mainDept_description = data_mainDept["main.dept.descrtion"];
      let mainDept_id = data_mainDept["main.dept.id"];
      let checkbox_label_identifier = mainDept_id+mainDept_description.substring(0,1).toUpperCase();

      $(card_department).append(`
          <div class="row form-group">
              <div class="col-md-6">
                  <input id="${checkbox_label_identifier}" ${dept_checkbox} name="deptNameCheckBox" type="checkbox" data-description="${mainDept_description}" data-id="${mainDept_id}"></input>&nbsp;<label for="${checkbox_label_identifier}" >${mainDept_description}</label>
              </div>
          </div>
          `);
  });
}

//populate unit and department onload
appendUnit(units,true);
appendDepartment(mainDept,true);

function checkboxesCheckedCountUnit() {
  var checkboxes = $('.unit_checkbox');
  var checkedCount = 0;
  checkboxes.each(function() {
      if ($(this).prop('checked')) {
          checkedCount++;
      }
  });
  return checkedCount;
}
function checkboxesCheckedCountDept() {
  var checkboxes = $('.dept_checkbox');
  var checkedCount = 0;
  checkboxes.each(function() {
      if ($(this).prop('checked')) {
          checkedCount++;
      }
  });
  return checkedCount;
}

//append department on click units checkbox
$(document).on('click', '.unit_checkbox', function() {

  let countUnit = checkboxesCheckedCountUnit();

  appendMessageDeptMoreThanOne();

  if (countUnit == 1){// eq to 1
    let countDept = checkboxesCheckedCountDept();
    if (countDept == 0) {
      var checkboxIds = [];

      $('.unit_checkbox').each(function() {
          if ($(this).is(":checked")) {
            let checkboxId = $(this).attr('data-id');
            checkboxIds.push(checkboxId);
          }
      });
      const dataUnit = units;
      const findUnit = dataUnit.find(unit => unit['unit.id'] == checkboxIds);
      const mainDeptFrmUnit = findUnit["main.dept"];
      appendDepartment(mainDeptFrmUnit,false);
    }
  } else if (countUnit == 0) {// eq to 0
    appendDepartment(mainDept,true);
  }
});

//append unit on click deparment checkbox
$(document).on('click', '.dept_checkbox', function() {

  let countDept = checkboxesCheckedCountDept();
  
  appendMessageUnitMoreThanOne();

  if (countDept == 1){// eq to 1
    let countUnit = checkboxesCheckedCountUnit();
    if (countUnit == 0) {
      var checkboxIds = [];

      $('.dept_checkbox').each(function() {
          if ($(this).is(":checked")) {
            let checkboxId = $(this).attr('data-id');
            checkboxIds.push(checkboxId);
          }
      });
      const dataMainDept = mainDept;
      const findUnit = dataMainDept.find(main => main['main.dept.id'] == checkboxIds);
      const mainUnitFrmDept = findUnit["unit"];
      appendUnit(mainUnitFrmDept,false);
    }
  } else if (countDept == 0) {// eq to 0
    appendUnit(units,true);
  }
});


