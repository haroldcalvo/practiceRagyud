$(document).ready(function () {
    var autocompleteInstanceBranch = null;
    //UNITS LIST
    document.getElementById('branch').addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            populateBranch(e.target.value);
        }
  
        if ($('#unit_id').val() != "" && e.target.value == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
  
    function populateBranch(input) {
        const jsonData = {
            procedure_name_given: 'getUnitList',
            method_given: 'GET',
            module_given: 'EmployeeProfile-API',
            description: input
        };
        //console.log(jsonData);
        executeService(jsonData, function (response_from_service) {
        response_from_service = response_from_service.filter((item, index, self) => index === self.findIndex((t) => t.unit_id === item.unit_id) );
            const arrInfo = response_from_service;
  
            const unitInput = document.getElementById('branch');
            const  unitIdInput = document.getElementById('unit_id');
  
            if (!arrInfo[0]?.branch) {
                unitInput.value = "No data found";
                unitIdInput.value = '';
                return;
            }
  
            arrInfo.forEach(info => {
                info.label = capitalizeEachWord(info.branch);
            });
  
            initializeBranchAutocomplete(arrInfo);
  
            unitInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
        });
    }
  
    function initializeBranchAutocomplete(sourceArray) {
        if (autocompleteInstanceBranch) {
            autocompleteInstanceBranch.autocomplete("destroy");
        }
        autocompleteInstanceBranch = $("#branch").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 3,
            select: function (event, ui) {
                var e = ui.item;
                $('#unit_id').val(e.unit_id);
                document.getElementById('branch').classList.remove('is-invalid');
                document.getElementById('branch').classList.add('is-valid');
            }
        });
    }


});