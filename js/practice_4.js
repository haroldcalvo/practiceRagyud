$(document).ready(function () {
let firstModal = $('#firstModal');
let buttonOpen = $('#ButtonOpen');
let closeDialog = $('#closeDialog');


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

var Methods ={
  checkValue : function(nameValue){
    let inputNames = $('#Name');
    if(nameValue === ''){
      inputNames.addClass('InputStatus');
    }else{
      inputNames.removeCLass('InputStatus');
    }
  }
}

var Person = function(age , name, height){
  this.age = age; 
  this.name = name; 
  this.height = height; 

};
let submitButton = $('#submit');
submitButton.click(function(){
  var inputName = $('#Name').val();
  var inputAge = $('#Age').val();
  var inputHeight = $('#Height').val();

  
  Methods.checkValue(inputName);
  
    var nameVal = inputName;
    var ageVal = inputAge || 'null';
    var heightVal = inputHeight || 'null';
    $('#boang').text(`Hi I'm ${nameVal} and I'm ${ageVal} rigth now and my height is ${heightVal}`)
  })


});