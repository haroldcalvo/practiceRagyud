
function addData() {
  appendUnit(units,true);
  appendDepartment(mainDept,true);
}

$('#btnSave').on('click', function() {

  const period_entry_id = parseInt(1);//ibutang and id sa period inig human og pili sa period field
  jsonObj = {};
  jsonArrayUnit = [];
  jsonArrayDept = [];
  jsonArrayUnitDept = {};
  multiple_unit = 0;

  var checkedCheckboxesUnit = $(`[name='unitNameCheckBox']:checked`);
  var checkedCheckboxesDept = $(`[name='deptNameCheckBox']:checked`);

  let unit_length = checkedCheckboxesUnit.length;
  let dept_length = checkedCheckboxesDept.length;

  console.log(unit_length);
  console.log(dept_length);

  checkedCheckboxesUnit.each(function() {
    var value = $(this).attr('data-id');
    item = {
      unit_id: parseInt(value)
    };
    jsonArrayUnit.push(item);
  });
  checkedCheckboxesDept.each(function() {
    var value = $(this).attr('data-id');
    item = {
      dept_id: parseInt(value)
    };
    jsonArrayDept.push(item);
  });

  jsonObj = {
    period_id: period_entry_id,
    array_unit: jsonArrayUnit,
    array_dept: jsonArrayDept
  };

  console.log(JSON.stringify(jsonObj));
});