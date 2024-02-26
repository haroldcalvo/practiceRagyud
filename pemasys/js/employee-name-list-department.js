$(document).ready(function () {
    var autocompleteInstanceemployeeName = null;
    
    // EMPLOYEE NAME LIST
    document.getElementById('employee-name').addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            populateEmployeeName(e.target.value);
        }
  
        if ($('#employee_id').val() != "" && e.target.value == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
  
    function populateEmployeeName(name) {
        const jsonData = {
            procedure_name_given: 'getListOfEmployeeName',
            method_given: 'GET',
            module_given: 'EmployeeProfile-API',
            description: name
        };
        //console.log(jsonData);
        executeService(jsonData, function (response_from_service) {
          //console.log(response_from_service);
            const arrInfo = response_from_service;
  
            const nameInput = document.getElementById('employee-name');
            const  nameIdInput = document.getElementById('employee_id');
  
            if (!arrInfo[0]?.employee_name) {
                nameInput.value = "No data found";
                nameIdInput.value = '';
                return;
            }
  
            arrInfo.forEach(info => {
                info.label = info.employee_name;
            });
  
            initializeEmployeeNameAutocomplete(arrInfo);
  
            nameInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
        });
    }
  
    function initializeEmployeeNameAutocomplete(sourceArray) {
        if (autocompleteInstanceemployeeName) {
            autocompleteInstanceemployeeName.autocomplete("destroy");
        }
        autocompleteInstanceemployeeName = $("#employee-name").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 3,
            select: function (event, ui) {
                var e = ui.item;
                $('#employee_id').val(e.employee_id);
                document.getElementById('employee-name').classList.remove('is-invalid');
                document.getElementById('employee-name').classList.add('is-valid');
            }
        });
    }
    //  // Event listener for town change
    //  $('#employee-name').change(function() {
    //     $('#department').val(''); // Empty lower-level fields
    //     $('#department_id').val(''); // Empty corresponding IDs
    //     document.getElementById('department').classList.remove('is-valid', 'is-invalid');
    // });

    //  // Event listener for country selection
    //  $("#employee-name").on("autocompleteselect", function(event, ui) {
    //     // Trigger the change event for country name
    //     $("#employee-name").trigger("change");
    // });

});