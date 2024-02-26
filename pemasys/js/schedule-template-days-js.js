$(document).ready(function(){

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var date = today.getDate().toString().padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + date;
    $('#entry-date').val(formattedDate);
  
    function resetModalWork() {
        $('#myFormWork')[0].reset();
        $('#btnSaveWork').show();
        $('#myFormWork input').removeClass('is-valid is-invalid');
        $('#message-form-work').empty();
        $('.sundayTime, .mondayTime, .tuesdayTime, .wednesdayTime, .thursdayTime, .fridayTime, .saturdayTime').prop('disabled', true); // Enable all time inputs
          
          // Uncheck all checkboxes
          $('[id$="Box"]').prop('checked', false);
        $('#largeModalWork').modal('hide');
    }
    
  
      $('#largeModalWork').on('hidden.bs.modal', function(e) {
        resetModalWork();
      });
  
      // for ADD
     $(document).on('click', '.addButton', function() {
      $('#entry_id').val(0);
      $('#largeModalLabelWork').html('Add Work Schedule Template');
      $('.sundayTime, .mondayTime, .tuesdayTime, .wednesdayTime, .thursdayTime, .fridayTime, .saturdayTime, #btnSaveWork').prop("disabled", true);
      resetModalWork();
          var rowIndex = $(this).closest('tr').index();
          var data = jsonObj[rowIndex];
          var sched_id = data.template_id;
          $('#schedule-template-id').val(sched_id);
          $('#largeModalWork').modal('show');
      });
  
     // for UPDATE
      $(document).on('click', '.updateButton', function() {
          $('#btnCancelWork').show();
          $('#btnSaveWork').prop("disabled", true);
          resetModalWork();
          var rowIndex = $(this).closest('tr').index();
          var data = jsonObj[rowIndex];
          var updateWST = data.template_id;
          if(updateWST != 0){
              $('#largeModalLabelWork').html('Update Work Schedule Template');
          }
          $('#schedule-template-id').val(updateWST);
          $('#entry_id').val(updateWST);
          const jsonData = {
            procedure_name_given : 'getDaysScheduleTemplate',
            method_given : 'GET',
            module_given : 'EmployeeProfile-API',
            id : updateWST
          };
  
          executeService(jsonData, function(response_from_service) {
            const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
            for (let i = 0; i < response_from_service.length; i++) {
                const dayNumber = response_from_service[i].day_number;
                const dayName = daysOfWeek[dayNumber - 1];
                const timeIn = response_from_service[i].time_in;
                const timeOut = response_from_service[i].time_out;
  
                if (timeIn !== null || timeOut !== null) {
                    $(`#${dayName}Box`).prop("checked", true);
                    $(`.${dayName}In`).val(timeIn);
                    $(`.${dayName}Out`).val(timeOut);
                }
            }
        });
          $('#largeModalWork').modal('show');
      });
  
  });
//for VALIDATION
$(document).ready(function () {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const updateSaveButton = () => {
      let checkedCount = 0;
      let allInputsHaveValues = true;

      daysOfWeek.forEach(day => {
          const checkbox = document.getElementById(`${day}Box`);
          if (checkbox.checked) {
              checkedCount++;
              const timeInputIn = document.querySelector(`.${day}In`);
              const timeInputOut = document.querySelector(`.${day}Out`);

              if (!timeInputIn.value || !timeInputOut.value) {
                  allInputsHaveValues = false;
              }
          }
      });

      const btnSaveWork = document.getElementById('btnSaveWork');
      btnSaveWork.disabled = checkedCount < 5 || !allInputsHaveValues;
  };

  daysOfWeek.forEach(day => {
      const checkbox = document.getElementById(`${day}Box`);
      const timeInputIn = document.querySelector(`.${day}In`);
      const timeInputOut = document.querySelector(`.${day}Out`);

      checkbox.addEventListener('change', function () {
          if (this.checked) {
              timeInputIn.removeAttribute('disabled');
              timeInputOut.removeAttribute('disabled');

              // Copy values from the previous time input
              timeInputIn.value = prevInTime;
              timeInputOut.value = prevOutTime;
          } else {
              timeInputIn.value = '';
              timeInputOut.value = '';
              timeInputIn.setAttribute('disabled', 'disabled');
              timeInputOut.setAttribute('disabled', 'disabled');
          }
          updateSaveButton();
      });

      timeInputIn.addEventListener('input', function () {
          prevInTime = timeInputIn.value;
          updateSaveButton();
      });

      timeInputOut.addEventListener('input', function () {
          prevOutTime = timeInputOut.value;
          updateSaveButton();
      });
  });

  // Initialize previous values to null
  let prevInTime = null;
  let prevOutTime = null;

  updateSaveButton(); // Check initial state on page load
});


function formatTimeToHHMM(inputTime) {
    if (!inputTime || inputTime.trim() === "") {
      return null;
    }
  
    const date = new Date(`2000-01-01T${inputTime}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  //SAVING DATA
$(document).ready(function(){
    $(document).on('click', '#btnSaveWork', function() {
     const dayNumber = [];
       // Iterate through each row of the form-group
       $('.row.form-group').each(function() {
           const day = {
               template_id : $('#schedule-template-id').val(),
               day_number: $(this).find('.days').attr('name'), // Get the day number from the 'name' attribute of the checkbox
               time_in : $(this).find('.time-in').val() || null, // Get the time value from the 'time-in' input
               time_out : $(this).find('.time-out').val() || null, // Get the time value from the 'time-out' input
           };
            if (day.day_number !== undefined) {
               dayNumber.push(day);
           }
       });
       var template_id = $('#schedule-template-id').val();
       const jsonData = {
         procedure_name_given : 'postJSONScheduleTemplateDays',
         method_given : 'POST',
         module_given : 'EmployeeProfile-API',
         template_id : template_id,
         days_schedule : dayNumber
       };
       //console.log(jsonData);
       if(isJSONValid(jsonData)) {
           $('#btnSaveWork').attr('disabled',true);
           $('#btnCancelWork').hide();
           $('#message-form-work').prepend('<span id="save-message" class="control-label mb-1"><small class="is-highlight">Are you sure you want to <span class="text-bold">save</span> this data?<span id="save-message-no-ok" class="pull-right message-not-ok">No</span><span id="save-message-ok" class="pull-right message-ok">Yes</span></small><br></span>');
             
             //validationAttr();
 
             //BUTTON NO
             $('#save-message-no-ok').click(function(){
               $('#save-message, #err-save-message').remove();
               $('#btnCancelWork').show();
               $('#btnSaveWork').attr('disabled',false);
             //    validationRemoveAttr();
             });
 
             //BUTTON YES
             $('#save-message-ok').click(function(){
                 $('#btnSaveWork').hide();
                 $('#save-message').remove();
                 $('.div-loader').addClass('loader-line');
                 executeService(jsonData, function(response_from_service) {
                   //console.log(response_from_service);
                   setTimeout(function(){
                     $('.div-loader').removeClass('loader-line');
                     var success = response_from_service.success;
 
                     if(success > 0){
                       $('.close, #btnCancelWork').remove();
 
                       $('#message-form-work').prepend('<span id="save-message" class="control-label mb-1"><small class="is-valid">'+response_from_service.message+'<span id="continue-to-reload" class="pull-right message-ok" data-dismiss="modal">Continue</span></small><br></span>');
                       $('#continue-to-reload').click(function(){
                         setTimeout(function(){
                           location.reload();
                         },200);
                       });
                     }else {
                       $('#message-form-work').prepend('<span id="save-message" class="control-label mb-1"><small class="is-invalid">'+response_from_service.message+'<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
                     }
 
                     $('#err-save-message-ok').click(function(){
                       setTimeout(function(){
                         location.reload();
                       },200);
                     });
                   },1200);
                 });
             });
           }else {
             $('#message-form-work').prepend('<span id="err-save-message" class="control-label mb-1"><small class="is-invalid">Something went wrong during the saving process.<span id="err-save-message-ok" class="pull-right message-ok" data-dismiss="modal">Try again</span></small><br></span>');
           }
           $('#err-save-message-ok').click(function(){
             setTimeout(function(){
               location.reload();
             },200);
           });
     });
     function isJSONValid(jsonData) {
       try {
           JSON.stringify(jsonData);
           return true;
       } catch (error) {
           return false;
       }
     }
 });