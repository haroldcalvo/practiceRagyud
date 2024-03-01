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

var Person = function(age , name, height){
  this.age = age; 
  this.name = name; 
  this.height = height; 

};
// let firstPerson = new Person (21 ,'Harold', '167cm');
// console.log(`Hi I'm ${firstPerson.name} and I'm ${firstPerson.age} rigth now and my height is ${firstPerson.height}`);

// let userInputName = prompt("Please input your name: ");
// let userInputAge = prompt("Please input your age: ");
// let userInputHeight = prompt("Please input your height: ");
// let InputPerson = new Person(userInputAge, userInputName, userInputHeight);
// console.log(`Hi I'm ${InputPerson.name}, I'm ${InputPerson.age} year's old, and hy height is ${InputPerson.height} cm`);

let appendInput = (function(){

console.log();

})
appendInput()

let submitButton = $('#submit');

submitButton.click(function(){
var InputPerson = new Person(inputAge, inputName, inputHeight);
var inputName = $('#Name');
var inputAge = $('#Age');
var inputHeight = $('#Height');

  let nameVal = inputName.val();
  let ageVal = inputAge.val();
  let heightVal = inputHeight.val();
  $('#boang').text(`Hi I'm ${nameVal || 'No Value'} and I'm ${ageVal || 'No Value'} rigth now and my height is ${heightVal || 'No Value'}`)
})