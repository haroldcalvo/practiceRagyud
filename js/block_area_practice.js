// $(function () {
//   //creating a function clicking type of animal will populate the object what type of animal
//   var card_type = $('#card_animal');

//   //creating an function to display all type of animal kingdom
//   var card_type = $('#card_type');
//   function cardType_Display() {
//     // Loop through the animal_kingdom array using $.each()
//     $.each(animal_kingdom, function (index, kingdom) {
//       // Append checkbox and label for each type
//       $(card_type).append(
//         `
//         <div class="col col-md-12">
//           <div class="row form-group">
//               <div class="col col-md-2" >
//               <label for="checkbox${kingdom.id}">${kingdom.type}</label>
//               </div>
//               <div class="col col-md-6">
//                   <div class="form-check">
//                     <input class="choice-cont" type="checkbox" onclick="displayDetails(event,${kingdom.id})" id="${kingdom.id}" value="${kingdom.type}"/>
//                   </div>
//               </div>
//           </div>
//         </div>
//       `);
//     });
//   }
//   cardType_Display();
// });

// var animal_kingdom = [
//   {
//     "type": "Herbivore",
//     "id": 1,
//     "animal": [
//       {
//         "name": "Deer",
//         "id": 1,
//         "feed": "Grass"
//       },
//       {
//         "name": "Elephants",
//         "id": 2,
//         "feed": "fruits"
//       },
//       {
//         "name": "Rabbits",
//         "id": 3,
//         "feed": "vegetables"
//       }
//     ]
//   },
//   {
//     "type": "Carnivores",
//     "id": 2,
//     "animal": [
//       {
//         "name": "Lion",
//         "id": 1,
//         "feed": "zebras"
//       },
//       {
//         "name": "Tiger",
//         "id": 2,
//         "feed": "wild boar"
//       }
//     ]
//   },
//   {
//     "type": "Omnivorse",
//     "id": 20,
//     "animal": [
//       {
//         "name": "Bear",
//         "id": 1,
//         "feed": "Fruits and Humans"
//       },
//       {
//         "name": "Cockroach",
//         "id": 2,
//         "feed": "i dont know"
//       }
//     ]
//   }
// ]

// function displayDetails(event, id) {
//   $(".choice-cont:not(#" + id + ")").prop('checked', false);
//   $('#card_animal').html('');

//   if ($(event.target).prop('checked')) {
//     var details = animal_kingdom.filter(e => e.id === id);
//     $.each(details[0].animal, function (i, detail) {
//       $('#card_animal').append(
//         `<div class="col col-md-12">
//           <div class="row form-group">
//               <div class="col col-md-12" >
//               <span>${detail.name} --> ${detail.feed}</span>
//               </div>
//           </div>
//         </div>`
//       );
//     });
//   }
// }
// var Person = [
//   {
//     name: "Harold",
//     id: 4,
//     lName: "Calvo",
//     age: 23,
//     cars: [
//       {
//         name: "Ford",
//         model: ["Fiesta", "Mustang", "Focus"],
//         id: 0
//       },
//       {
//         name: "BMW",
//         model: ["320", "X3", "X5"],
//         id: 1
//       }
//     ],
//     bloodType: "b+",
//     fullname: function () {
//       return this.name + " " + this.lName
//     }
//   }
//   ,
//   {
//     name: "Ben",
//     age: 23,
//     id: 5,
//     cars: [
//       {
//         name: "Lexus",
//         model: ["Lexus CT 200h", "Lexus LS 350", "LEXUS LS LS500h"],
//         id: 2
//       },
//       {
//         name: "Volvo",
//         model: ["Volvo S60 Recharge", "Volvo S90 Inscription", "Volvo S90 Ultimate B6"],
//         id: 3
//       }
//     ],
//     bloodType: "b+",
//     fullname: function () {
//       return this.name + " " + this.lName
//     }
//   }
// ]
// $(document).ready(function () {

  
//   function populateCars() {
//     $.each(Person, function (index, person) {
//       $.each(person.cars, function (index1, personCars) {
//         const checkBoxId = `checkbox${index}_${index1}`;
//         const checkbox = `<input type="checkbox" id="${checkBoxId}" name="${checkBoxId}" class="form-check-input">`
//         const populateCarsName = `<h2><label for="${checkBoxId}" id="carsName${personCars.id}" class="form-check-label ">${checkbox}${personCars.name}</label></h2>`
//         // const populateModel = personCars.model.map(models => `<label id="populateModel${personCars.id}" class="form-check-label abagago" >${models} </label>`)
//         $(".practice").append(populateCarsName  + "<br>");

//         var ModelsId = `#populateModel${personCars.id}`;
//         var ModelIdRe = `${ModelsId.substring(14)}`;
//       console.log("Label ID corresponding to checkbox:", ModelIdRe);

//       });
//     });

//     $('input[type=checkbox]').click(function(){
//       var checkboxId = $(this).attr('id');
//       var selectCheckbox = $('input[type=checkbox]').not('#'+ checkboxId);
//       $(selectCheckbox).prop('checked',false);
//       console.log(checkboxId);
//     });
  
//   }
//   function populateCheckboxes() {
//     Person.forEach(person => { // Change personCars to Person
//         const ModelsId = `#populateModel${person.id}`; // Adjust variable name
//         const checkbox = $(ModelsId); // Select checkbox using jQuery
//         if (checkbox.length) {
//             checkbox.empty(); // Clear existing content
//             person.cars.forEach(car => { // Adjust property name from model to cars
//                 car.model.forEach(model => { // Adjust property name from model to model
//                     checkbox.append(`<label class="form-check-label">${model}</label><br>`);
//                 });
//             });
//         }
//     }); 
// } 
// // function populateCars() {
// //   $.each(Person, function (index, person) {
// //     $.each(person.cars, function (index1, Personcars) {
// //       var checkboxId = `checkbox${index}_${index1}`;
// //       var checkbox = `<input style="margin-top: 10.3px;" type="checkbox" id="${checkboxId}" name="${checkboxId}" value="${checkboxId}" class="form-check-input">`;
// //       var carHeader = `<h2>${Personcars.name}</h2>`;
// //       var models = Personcars.model.map(models => `<label class="car-model" data-person-index="${index}" data-car-index="${index1}">${models}</label>`).join("<br>");
// //       $(".practice").append(checkbox + carHeader + models + "<br>");
// //     });
// //   });
// // };

// // populateCars();
// populateCheckboxes()
// populateCars();
// });

// //this my own understanding about this
// //first I'm creating a x variable for empty string that we can use later to append the text here from loop
// //second I'm creating  a person object/variable that has property name(string), lname(String) , age(number) and property object which is cars(nested object)

// function computedTwoVariable(decBig, decLow){
//   let totalOfComputedVaraiabe = decBig * decLow;
//   return totalOfComputedVaraiabe;
// }
// let Tax = 2323.23;
// let Rate = 0.5;
// console.log(`The computed value of Tax ${Tax} multiplied to Rate ${Rate} is: ${computedTwoVariable(Tax,Rate)}`);

// let Person = (  
//   function write(){
//    console.log("");
//   }
// )();
//   console.log(Person);


