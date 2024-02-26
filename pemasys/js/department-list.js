$(document).ready(function () {
    var autocompleteInstanceDepartment = null;
    
    document.getElementById('department').addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            populateDepartment(e.target.value);
        }
  
        if ($('#department_id').val() != "" && e.target.value == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
  
    function populateDepartment(department_name) {
        const jsonData = {
            procedure_name_given: 'getDepartmentList',
            method_given: 'GET',
            module_given: 'EmployeeProfile-API',
            description: department_name,
        };
        //console.log(jsonData);
        executeService(jsonData, function (response_from_service) {
            response_from_service = response_from_service.filter((item, index, self) => index === self.findIndex((t) => t.department_id === item.department_id) );
            const arrInfo = response_from_service;
  
            const departmentInput = document.getElementById('department');
            const  departmentIdInput = document.getElementById('department_id');
  
            if (!arrInfo[0]?.department) {
                departmentInput.value = "No data found";
                departmentIdInput.value = '';
                return;
            }
  
            arrInfo.forEach(info => {
                info.label = info.department;
            });
  
            initializeDepartmentNameAutocomplete(arrInfo);
  
            departmentInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
        });
    }
  
    function initializeDepartmentNameAutocomplete(sourceArray) {
        if (autocompleteInstanceDepartment) {
            autocompleteInstanceDepartment.autocomplete("destroy");
        }
        autocompleteInstanceDepartment = $("#department").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 3,
            select: function (event, ui) {
                var e = ui.item;
                $('#department_id').val(e.department_id);
                document.getElementById('department').classList.remove('is-invalid');
                document.getElementById('department').classList.add('is-valid');
            }
        });
    }
});