$(document).ready(function () {
    var autocompleteInstanceSubDepartment = null;
    
    document.getElementById('subDepartment').addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            populateSubDepartment(e.target.value);
        }
  
        if ($('#sub_id').val() != "" && e.target.value == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
  
    function populateSubDepartment(department_name) {
        const jsonData = {
            procedure_name_given: 'getSubDepartmentList',
            method_given: 'GET',
            module_given: 'EmployeeProfile-API',
            description: department_name
        };
        //console.log(jsonData);
        executeService(jsonData, function (response_from_service) {
            response_from_service = response_from_service.filter((item, index, self) => index === self.findIndex((t) => t.sub_id === item.sub_id) );
            const arrInfo = response_from_service;
  
            const subInput = document.getElementById('subDepartment');
            const  subIdInput = document.getElementById('sub_id');
  
            if (!arrInfo[0]?.sub_department) {
                subInput.value = "No data found";
                subIdInput.value = '';
                return;
            }
  
            arrInfo.forEach(info => {
                info.label = capitalizeEachWord(info.sub_department);
            });
  
            initializeSubDepartmentNameAutocomplete(arrInfo);
  
            subInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
        });
    }
  
    function initializeSubDepartmentNameAutocomplete(sourceArray) {
        if (autocompleteInstanceSubDepartment) {
            autocompleteInstanceSubDepartment.autocomplete("destroy");
        }
        autocompleteInstanceSubDepartment = $("#subDepartment").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 3,
            select: function (event, ui) {
                var e = ui.item;
                $('#sub_id').val(e.sub_id);
                document.getElementById('subDepartment').classList.remove('is-invalid');
                document.getElementById('subDepartment').classList.add('is-valid');
            }
        });
    }
});