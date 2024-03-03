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
  checkValue : function(){
    let inputNames = $('#Name');
    let inputNameValue = $('#Name').val();
    if(inputNameValue === ''){
      inputNames.addClass('InputStatus');
    }else{
      inputNames.removeClass('InputStatus');
    }
  },
  addSomeTable : function(){
    let Tabledata = '';
  }
}
var Person = function(age , name, height){
  this.age = age; 
  this.name = name; 
  this.height = height; 

};

var inputNames = $('#Name');
var inputAges = $('#Age');
var inputHeights = $('#Height')
let submitButton = $('#submit');

submitButton.click(function(){
  Methods.checkValue();
  var inputName = $('#Name').val();
  var inputAge = $('#Age').val();
  var inputHeight = $('#Height').val();

    var nameVal = inputName;
    var ageVal = inputAge || 'null';
    var heightVal = inputHeight || 'null';
    $('#boang').text(`Hi I'm ${nameVal} and I'm ${ageVal} rigth now and my height is ${heightVal}`)
  })


});