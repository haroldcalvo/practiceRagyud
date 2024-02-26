var validdata = document.getElementById("message-div-valid");
var errordata = document.getElementById("message-div-error");
var showverfiy = document.getElementById("message-div-verify");
var autocompleteInstance = null;
              var inputdescription_input_id = document.getElementById("inputdescription_input_id");
              var storeOdata = document.getElementById("storeOdata");
function editItem(oData){
    var storeOdata = document.getElementById("storeOdata");
    storeOdata.value = oData;
    console.log(oData)
}
function SaveUpdate(){

  setTimeout(function() {
      // Remove the 'loader-line' class from the element with the class '.div-loader' after a delay of 2000 milliseconds (2 seconds).
      $('.div-loader').removeClass('loader-line');
  }, 1200); // Delay in milliseconds (2 seconds in this example)
 
  objParam = {
      "user_id": storeOdata.value,
      "subscriber_user_id": inputdescription_input_id.value
  }
  paramBody = JSON.stringify(objParam);
  paramBody = paramBody.replace(/"/g, '\\"');
  paramBody = '"' + paramBody + '"';
  console.log(paramBody)
 
  var response = InvokeService("Subscriber_application_commons/Post/postSubscriberApplicationUser", "POST", paramBody);
  var personresponse;
  personresponse = JSON.parse(response.data)
  if (personresponse.code == 200) {
      validdata.style.display = "block"
      showverfiy.style.display = "none"
      errordata.style.display = "none";
  } else {
      errordata.style.display = "block";
      showverfiy.style.display = "none"
  }
}

// populate the subscriber application users
var inputdescription = document.getElementById("groupdescription");

// populate the selected town or state
inputdescription.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key == "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      populateSubapplication();

       // Simulate a Backspace keypress event
       var backspaceEvent = new KeyboardEvent("keydown", { keyCode: 8 });
       inputdescription.dispatchEvent(backspaceEvent);
  }
});
function populateSubapplication() {

      objParam = {
        "search_term":inputdescription.value,
    }

    paramBody = JSON.stringify(objParam);
    paramBody = paramBody.replace(/"/g, '\\"');
    paramBody = '"' + paramBody + '"';
console.log(paramBody)
   
      var response = InvokeService("Subscriber_application_commons/Get/getApplicationSubscribers" , "POST", paramBody);
      var response_data = JSON.parse(response.data);
      console.log(response_data)
      if (response_data.code == 200) {

          var arrInfo = JSON.parse(response_data.jsonData);
          for (var i = 0; i < arrInfo.length; i++) {
              arrInfo[i].label = arrInfo[i].user_login_name;
              delete arrInfo[i].user_login_name;
          }
          initializeapplicationAutocomplete(arrInfo);
          inputdescription.dispatchEvent(new KeyboardEvent('onkeypress', { 'key': 'Enter' }));
      }
  
}

function initializeapplicationAutocomplete(sourceArray) {
  if (autocompleteInstance) {
      autocompleteInstance.autocomplete("destroy");
  }

  autocompleteInstance = $("#groupdescription").autocomplete({
      source: sourceArray,
      minLength: 0,
      delay: 0,
      maxShowItems: 3,
      select: function (event, ui) {
          var e = ui.item;
          document.getElementById("inputdescription_input_id").value = e.user_id;
      }
  });
}

//event listeners for saving 



//validating the data

$(document).ready(function(){
  $('#updategroup').click(function(){
  $(this).attr('disabled', true);
  showverfiy.style.display = "block"
  
});

// if i click yes
$('#save-message-ok').click(function(){
   //append loader on top of modal
   $('.div-loader').addClass('loader-line');
  if (inputdescription_input_id.value == null || inputdescription_input_id.value == "") {
      inputdescription.style.borderColor = "red"; // Note the capital 'C' in borderColor and the absence of "1px solid"
      setTimeout(function() {
        // Remove the 'loader-line' class from the element with the class '.div-loader' after a delay of 2000 milliseconds (2 seconds).
        $('.div-loader').removeClass('loader-line');
    }, 1200); // Delay in milliseconds (2 seconds in this example)
   
  }else{
      showverfiy.style.display = "none"
      SaveUpdate();
      inputdescription.style.borderColor = "#28a745";
  }
  
});

// hide properties
$('#save-message-no-ok').click(function(){
  $('#message-div-verify').hide(); // Hide the element with ID 'showverfiy'
  $('#updategroup').prop('disabled', false); // Remove the 'disabled' property from the element with ID 'updategroup'
  inputdescription.style.borderColor = "#ced4da";
});



// for error message
$('#err-save-message-ok').click(function(){
  setTimeout(function(){
      location.reload();
  }, 200);
});
$('#continue-to-reload').click(function() {
  // Set a flag in localStorage to indicate that updategrouping() should be called
  localStorage.setItem('shouldCallUpdategrouping', 'true');

  setTimeout(function() {
      location.reload();
  }, 200);
});

});