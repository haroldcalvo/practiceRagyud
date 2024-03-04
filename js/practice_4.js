let firstModal = $('#firstModal');
let buttonOpen = $('#ButtonOpen');
let closeDialog = $('#closeDialog');

$(document).ready(function () {
  buttonOpen.click(function () {
    if (firstModal.prop('hidden')) {
      firstModal.prop('hidden', false);
      firstModal[0].showModal();
    }
  });
  closeDialog.click(function () {
    if (!firstModal.prop('hidden')) {
      firstModal.prop('hidden', true);
      firstModal[0].close();
    }
  });
});

var Person = function (age, name, height) {
  this.age = age;
  this.name = name;
  this.height = height;

};
let methods = {
  valueInputPerson: function () {
    let inputNameVal = $('#Name').val();
    let inputAgeVal = $('#Age').val();
    let inputHeightVal = $('#Height').val();
    var InputPerson = new Person(inputAgeVal, inputNameVal, inputHeightVal);
    return InputPerson;
  }
};

let submitButton = $('#submit');
submitButton.click(function () {
  let valuePerson = methods.valueInputPerson();
  var valid = true;

  var elem = $('.validate');

  elem.each(function (i, element) {
    $(element).removeClass('is-invalid');
    if ($(element).val() === "") {
      valid = false;
      $(element).addClass('is-invalid');
    }
  });

  if (valid) {
    $("#boang").append(`I'm ${valuePerson.name || "Please Input a name"} and I'm ${valuePerson.age || "Please Input a name"} years old right now and my height is ${valuePerson.height || "Please Input a name"}`);
  }

});