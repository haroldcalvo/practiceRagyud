$(document).ready(function () {
    var autocompleteInstanceTemplate = null;
  
    //SCHEDULE LIST
    document.getElementById('template').addEventListener("keypress", function (e) {
        //console.log("sad");
        if (e.key == "Enter") {
            e.preventDefault();
            populateTemplate(e.target.value);
        }
  
        if ($('#template_id').val() != "" && e.target.value == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
  
    function populateTemplate(template) {
        const jsonData = {
            procedure_name_given: 'getScheduleTemplateList',
            method_given: 'GET',
            module_given: 'EmployeeProfile-API',
            description: template
        };
        //console.log(jsonData);
        executeService(jsonData, function (response_from_service) {
          //console.log(response_from_service);
            const arrInfo = response_from_service;
  
            const scheduleInput = document.getElementById('template');
            const  scheduleIdInput = document.getElementById('template_id_id');
  
            if (!arrInfo[0]?.description) {
                scheduleInput.value = "No data found";
                scheduleIdInput.value = '';
                return;
            }
  
            arrInfo.forEach(info => {
                info.label = capitalizeEachWord(info.description);
            });
  
            initializeTemplateAutocomplete(arrInfo);
  
            scheduleInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
        });
    }
  
    function initializeTemplateAutocomplete(sourceArray) {
        if (autocompleteInstanceTemplate) {
            autocompleteInstanceTemplate.autocomplete("destroy");
        }
        autocompleteInstanceTemplate = $("#template").autocomplete({
            source: sourceArray,
            minLength: 0,
            delay: 0,
            maxShowItems: 3,
            select: function (event, ui) {
                var e = ui.item;
                $('#template_id').val(e.template_id);
                document.getElementById('template').classList.remove('is-invalid');
                document.getElementById('template').classList.add('is-valid');
            }
        });
    }

});