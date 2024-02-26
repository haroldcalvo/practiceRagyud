// console.log('Practice starts here.');

// -- variable declaration - var and let
// let intVariableA;
// var intVariableA;

// intVariableA = 5;
// strSample = 'The quick';
// console.log(intVariableA);
// console.log(strSample); 

// -- data types


// -- coercion
/* let intNumber_1 = 5;
let strNumber_1 = '5';
let decNumber;

decNumber = 1.05;

let intSum = intNumber_1 + strNumber_1;
console.log('Before conversion ' + intSum);
intSum = intNumber_1 + parseInt(strNumber_1);
console.log('After conversion ' + intSum);
console.log(intSum); */

// let c = a + b;
// let c = a + parseInt(b);

// console.log(c);

// -- operators
// -----------
// assignment             =
// arithmetic             + - / * %
// increment / decrement  ++ --
// string                 +
// logical and            && 
// logica or              ||
// member accessor        .
// code block             {}
// array element accessor []
// function invocator     ()


// -- arrays
// let intSeriesOfNumbers = [ 10, 20, 30, 40, 50 ];
// let strListOfNames = ['Pedro', 'Kulas', 'Maria', 'Juan', 'Petra'];

/* console.log(intSeriesOfNumbers);
console.log(intSeriesOfNumbers[2]);

console.log(strListOfNames[1]);
console.log(strListOfNames.length);
console.log(strListOfNames[10]); */

// let objVarious = ['Ramon', 'Juyot', 25, true];
// console.log(objVarious);

// console.log(a);
// console.log(typeof a)
// access beyond length


// sparse
// console.log(`Length of array BEFORE: ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers[10] = 100;
// console.log(intSeriesOfNumbers);
// console.log(`Length of array AFTER: ${intSeriesOfNumbers.length}`);


// console.log(`Content of array BEFORE pop: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers.pop();
// console.log(`Content of array AFTER pop: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);

// console.log(`Content of array BEFORE push: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers.push(200);
// console.log(`Content of array AFTER push: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);


// console.log('----------------- shift here ------------');

// console.log(`Content of array BEFORE shift: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers.shift();
// console.log(`Content of array AFTER shift: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);

// console.log('----------------- unshift here ------------');

// console.log(`Content of array BEFORE unshift: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers.unshift(999);
// console.log(`Content of array AFTER unshift: ${intSeriesOfNumbers} its length ${intSeriesOfNumbers.length}`);
 


// -- function declaration

/*
function sayHi() {
  console.log('Hi...');
}

function sayHello(strName) {
  // console.log('Hello ' + strName);
  console.log(`Hello ${strName}`);
}
*/

// sayHi();
// sayHi;
// let funcVariable = sayHi;
// funcVariable();

// sayHello('Peter');

// let a = sayHello;
// a('Kulas - invoked function through a variable');
// console.log('------ calling function without parameter -----');
// a();

/*
function computeInterestDue(decPrincipal, decInterestRate) {
  let decInterestDue = decPrincipal * decInterestRate;
  return decInterestDue;
} 

let decLoanAmount = 1000.00;
let decLoanRate = .05;

// console.log(computeInterestDue(decLoanAmount, decLoanRate));

console.log(`The computed interest due for principal ${decLoanAmount} with a rate of ${decLoanRate} is ${computeInterestDue(decLoanAmount, decLoanRate)}`);
*/

// -- function expressions

/*
(function () {
  console.log('A Function with no name...');
  console.log('Immediately invoke function expression');
})();
*/

/*
let funcNoName = (function () {
  console.log('A Function with no name...');
  console.log('Immediately invoke function expression');
});
funcNoName();
*/

// -- decisions

// compare operators  
// less than              <
// greater than           >
// less than or equal     <=
// greater than or equal  >=
// equal                  ==
// exactly equal          ===
// not equal              !=
// negator NOT            !


// var intCount = 10;
// var intLimit = 10;

/*
if (intCount > intLimit) {
  console.log(`Value of variable intCount ${intCount} is greater than ${intLimit}`);
} else if (intCount < intLimit) {
  console.log(`Value of variable intCount ${intCount} is less than ${intLimit}`);
} else if (intCount = intLimit) {
  console.log(`Value of variable intCount ${intCount} is equal to ${intLimit}`);
};
*/

/*
if (intCount != intLimit) {
  console.log('Dili sila equal');
} else {
  console.log('Pareho ra sila og value');
}
*/

/*
var hero = 'batman';
switch (hero)
{ 
  case 'superman':
    console.log('super strength');
    console.log('x-ray vision');
    break;
  case 'batman':
    console.log('intelligence');
    console.log('fighting skills');
    break;
  default:
    console.log('member of JLA');
};

var intNumber = 2;

switch (intNumber)
{ 
  case 1:
    console.log('super strength');
    console.log('x-ray vision');
    break;
  case 2:
    console.log('intelligence');
    console.log('fighting skills');
    break;
  default:
    console.log('member of JLA');
};
*/

// -- iterations

// let intSeriesOfNumbers = [ 10, 20, 30, 40, 50 ];
// let strListOfNames = ['Pedro', 'Kulas', 'Maria', 'Juan', 'Petra'];

/*
let intTemp;

for (i = 1; i < 3; i++) {
  console.log(` UNA the value of variable "i" in this loop is ${i}`);
  console.log('----- test increment ---');
  intTemp = ++i;
  // intTemp = (i * 1);
  console.log(`IKADUHA Value of "i" is ${i} value of "intTemp" ${intTemp}`);
  console.log(`IKATULO Value of "i" is ${i} value of "intTemp" using incrementor before display ${++intTemp}`);
}
*/

/*
for (i = 0; i < strListOfNames.length; i++) {
  console.log(`The content of variable "strListOfNames[${i}]" is ${strListOfNames[i]}`);
}
*/

/*

// intSeriesOfNumbers.forEach( (intNumber) => { console.log(`Content ${intNumber}`) });
for (i = 0; i < intSeriesOfNumbers.length; i++) {
  console.log(`Content ${intSeriesOfNumbers[i]}`);
};

*/

// -- scope basics

// let intNumber = 10;

/*
let intNumber;
intNumber = 10;

function sayABC() {

  let strName = '123';
  console.log(strName);
  console.log(`value of intNumber is ${intNumber}`);
};

intNumber = 1;
sayABC();

*/

// strName = strName + '456';
// console.log(strName);



// AFTERNOON
// -- returning functions 


/*
function one()
{
  return 'one';
}

// the value as returned by function one using () function invocator
// var value = one();
var value = one;

// console.log(value);
// console.log(value());

// the value assigned is a pointer to the function
value = one;
console.log(typeof value);
console.log(value());
console.log(typeof value());



function two()
{
  return function () {
    console.log('two');
  }  
}

// variable myFunction is assigned with the returned function
let myFunction = two();
console.log(myFunction());

function makeSayHi()
{
  return function (strName) {
    console.log(`Hi ${strName}`);
  }  
};

myFunction = makeSayHi();
console.log(typeof myFunction);
console.log(myFunction('Kulas'));

myFunction = makeSayHi()('Perdo');
console.log(typeof myFunction);
console.log(myFunction);

/*
// variable myFunction is assigned with object function two()
myFunction = two;
console.log(typeof myFunction);
console.log(typeof myFunction());
console.log(typeof myFunction()());

// console.log(typeof myFunction);
//console.log(myFunction);

// myFunction();

function three()
{
  return function () {
    return 'three';
  }
}

console.log(three());
console.log(three()());

*/

// module pattern

/*

var counter = (
  
  function () {

                // private stuff
                let count = 0;

                function print(message) {
                  console.log(message + ' --- ' + count);
                }

                // return an object
                return {
                          // value: count,

                          get: function () { return count; },

                          set: function (value) { count = value; },

                          increment: function () {
                            count += 1;
                            print('After increment: ');
                          },

                          reset: function () {
                            print('Before reset: ');
                            count = 0;
                            print('After reset: ')
                          }
                        }
              }
)();



// console.log(counter);

// initial value of count
console.log('--- showing initial value of variable "count" which is set to ZERO in function definiton');
console.log(counter.get());


// set value of count to 10
console.log(' --- showing value of variable "count" after setting it to 10');
counter.set(10);
console.log(counter.get());

// increment twice the variable "count" value will be PLUS 2
counter.increment();
counter.increment();
console.log(counter.get());
// counter.increment();

// reset variable "count" set to ZERO
console.log('--- showing value of variable "count" after resetting it to ZERO');
counter.reset();
console.log(counter.get());


// accidentaly created a closure - will be discussed subsequently
// console.log(counter.value)

// counter.set(7);
// console.log(counter.get());
// counter.reset();

*/

// -- closure
/*
function sayHello(name) {
  return function () {
    console.log('Howdy ' + name);
  }
}

function oistHello(name) {
  return ('Howdy ' + name);
}

let bob = sayHello('Bob');
console.log(typeof bob); 
console.log(bob());

console.log('--- after showing initial object bob');
let thisIsPeter = bob;
console.log(typeof thisIsPeter);
console.log(thisIsPeter());

let maria = oistHello('maria');
maria;
console.log(typeof maria);
console.log(maria);

let conrad = sayHello('conrad');
let grant = sayHello('grant');



console.log(typeof bob);
bob();
conrad();
grant();


// `this` keyword

*/

// -- destructuring

/*
let a, b, c, d, e;

let names = ['david', 'eddie', 'alex', 'michael', 'sammy'];

[a, b, c, e, d] = names;

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);


// destructuring portion and the rest assigned to another variable
console.log('---- descructuring portion ----');
let others;

[a, b, ...others] = names;

console.log(a);
console.log(b);
console.log(others);


let year, model;

({year, model} = {
  make: 'bmw',
  model: '745li',
  year: 2010,
  value: 5000
})

console.log(year);
console.log(model);


let car = {
  make: 'bmw',
  model: '745li',
  year: 2010,
  value: 5000
};

({ year, model } = car)

console.log(year);
console.log(model);


// regex
*/

// -- template-literals

/*
let name = 'bob';
console.log(`hi ${name}`);

let sentence = `                What this handout is about This handout will help you understand how
                paragraphs are formed, how to develop stronger paragraphs, and how to completely and
                clearly express your ideas. What is a paragraph? Paragraphs are the building blocks
                of papers.`;

console.log(sentence);

function getReasonCount() { return 1; }

let interpolation = `Give me ${( getReasonCount() == 1 ) ? 'one good reason' : 'a few reasons'} to try this`;
console.log(interpolation);

*/


// -- natives

/*

let myString = new String('howdy');
//console.log(myString);
console.log(myString.toString());

console.log(typeof myString); 

// PRIMITIVES
// String()
// Number()
// Boolean()
// Object()
// Function()
// Symbol()



// Array()
// RegExp()



// Date()
// Error()

let myPrimitive = 'THIS IS CRAZY';
console.log(typeof myPrimitive);
myPrimitive = myPrimitive.toLowerCase();
console.log(typeof myPrimitive);

let myNumber = new Number(7);
console.log(typeof myNumber);
console.log(myNumber.valueOf());
let myPrimitive = myNumber.valueOf();
console.log(typeof myPrimitive);

*/


// -- constructors

/*
let car = {
  make: 'bmw',
  model: '745li',
  year: 2010
};
*/

/*
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
let oldCar = new Car('toyota', 'vios', 2015);
let myCar = new Car('benz', 'excel', 2001);

// console.log(typeof Car());
console.log(oldCar);
console.log(myCar);

// add property
myCar.cost = 1005000.00;

console.log(oldCar);
console.log(myCar);

/*

function MyFunction() {
  console.log('I am a simple function');
}

let myFunction = new MyFunction();

console.log(typeof myFunction);

console.log(myFunction);

*/
let PlayerStatus = (function(){
  let age = 18;
  let ClassType = 'Any';
  let hit = 0
  let Player ={ 
    Status : {
      health : 400,
      mana : 200,
      level : 1 ,
      job : "None",
    },
    Equipment : {
      weapon :{
        name: 'wooden sword',
        damage: 10,
        level: 1
      },
      head : 'wooden helm',
      guanlet : 'wooden guanlet',
      boots : 'wooden boots',
      armor : 'wooden armor',
      pouldron : 'wooden pouldron'
    }
  }
  console.log('Welcome to the world of Sword Art Online');
  function viewEquipment (){
    let weapon = Player.Equipment.weapon;
    console.log(`Select an equipment to view`);
    console.log("Weapon:");
    let EquipmentList = $('<ul>');
    $.each(Player,function(index , PlayerInfo){
      EquipmentList.append(`<li>${index}: ${PlayerInfo}`);
    })
    $('.ViewEquipemnt').append(EquipmentList);
  }viewEquipment();
    function Attack(hit){
      console.log(`You just hit the monster`); 
      let damageDealth = Math.random() * hit;
      return damageDealth;
  }
      let hitpoints = 100;
      // // let damage = Attack(hitpoints);
      // console.log(`You just dealth ${damage}`);
})
();

// let originalCar = (function(){
//   print('hatdog');
// });
// let duplicateCar = originalCar;

// console.log(duplicateCar);
// console.log(originalCar);
// duplicateCar.owner = 'Pedro';
// console.log(duplicateCar);
// console.log(originalCar);

// console.log('-------------');
// let newCar = Object.create(originalCar);

// // initial properties values of created object
// console.log(newCar); // newly created object will inherit as default property value from its prototype
// console.log(newCar.make);
// console.log(newCar.model);
// console.log(newCar.year);


// assigning new values to properties of the created object
// newCar.make = 'audi';
// newCar.model = 'XCel';
// newCar.year = 2019;
// console.log(newCar);

// console.log(newCar.color);
// newCar.color = 'red';
// console.log(newCar.color);
// console.log(originalCar.color);


// console.log(Object.getPrototypeOf(newCar)); // this will fetch the object's source prototype

// newCar.color = 'RED'; // creating new property for the new object
// // console.log(newCar);

// console.log(originalCar.hasOwnProperty('color')); // this will return if the prototype also contains the added property in the new object
// console.log(newCar.hasOwnProperty('color')); // this will return if the new object contains the new property

// let myPrototype = Object.create(newCar);
// console.log(myPrototype);
// console.log(Object.getPrototypeOf(myPrototype));

// myPrototype.engine = 'V8'; // creating new property for the new object

// console.log(originalCar.hasOwnProperty('engine'));
// console.log(newCar.hasOwnProperty('engine'));
// console.log(myPrototype.hasOwnProperty('engine'));
// console.log(myPrototype);

// originalCar.doors = 4;
// console.log(newCar.doors);
// console.log(myPrototype.doors);



// -- classes



// CLASSES ARE TEMPLATE STRUCTURE OF AN OBJECT
// declaration
// class Car {
//   constructor(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }

//   print() {
//     console.log(`${this.make} ${this.model} (${this.year})`);
//   }
// }

// let myCar = new Car('bmw', '745li', 2010);
// myCar.print();



// class Mylife{
//   constructor (myDream = myDream, MyPassion, MyLove){
//     this.Daydream = myDream;
//     this.Passion = MyPassion;
//     this.Love = MyLove;
//   }
//   printa(){
//     console.log(`${this.Daydream} ${this.Passion} ${this.Love}`);
//   }
// }

// let mylife = new Mylife('Artist','Programmer','You');
// mylife.printa();













// -- arrow functions



// let hi = () => { console.log('howdy'); }

// hi(); 


// let hi = (name) => { console.log(`howdy ${name}`) };
// hi('bob'); 


// let add = (a, b) => { return a + b };
// console.log(add(7, 3)); 


// let names = ['david', 'eddie', 'alex', 'michael'];
// names.map((name) => { console.log(`howdy ${name}`) });



/*
for (i = 0; i < names.length; i++) {
  console.log(`howdy ${names[i]}`);
};
*/


/*
let names = ['david', 'eddie', 'alex', 'michael'];
let i = 0;
names.map((name) => { i++; console.log(`howdy ${name} ${i}`) });
*/

/*

let names = ['david', 'eddie', 'alex', 'michael'];
var transformed = names.map((name) => { return `howdy ${name}!` });
console.log(transformed);

let name1, name2, others;

[name1, name2, ...others] = transformed;
console.log(name1);
console.log(name2);
console.log(others);

*/

// -- null

/*
let a;
console.log(a);
console.log(typeof a);

let pattern = /xyz/;
let value = 'This is just a test';
let result = value.match(pattern);
console.log(result);
// console.log(typeof result);

if (result === null) {
  console.log('no match was found');
}

// a null means an object is expected but non exists


// -- dates

*/

// -- string


// let first = 'Knowledge is power but enthusiasm pulls the switch.';
// let second = 'Do or do not. There is no try.';
// let third = '4,8,15,16,23,42';

// // You can even call methids on string
// let bob = 'bob loves you'; 
// console.log(bob.toUpperCase());

// let mySplit = third.split(',');
// console.log(mySplit.length);
// console.log(mySplit);

// let mySlice = first.slice(13, 22);
// console.log(mySlice);

// let mySubstr = first.substr(13, 5);
// console.log(mySubstr);


// // case sensitive 
// let myEndsWith = second.endsWith('TRY.');
// console.log(myEndsWith);


// let myStartWith = second.startsWith('Do');
// console.log(myStartWith);

// let myInclude = second.includes('There');
// console.log(myInclude);

// let myRepeat = 'Ha!. '.repeat(3);
// console.log(myRepeat);

// let myTrim = '    bloated         ';
// console.log(myTrim.length);
// console.log(myTrim.trim().length);




// -- array method


// let names = ['david', 'eddie', 'alex', 'michael'];
// let others = [ 'sammy', 'gary', 'wolfgang', 'mark' ];

// let lost = [ 4, 8, 15, 16, 23, 42 ];
// let fibonacci = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];

// var combine = lost.concat(fibonacci);
// console.log(combine);


// console.log(fibonacci.join('-'));


// // push, pop

// console.log(lost.shift());
// console.log(lost);

// lost.unshift(1, 2, 3, 4);
// console.log(lost);


// console.log(names);
// console.log(names.reverse());
// console.log(names.sort());


// console.log(others.indexOf('mark'));
// console.log(others);

// console.log(combine);
// console.log(combine.lastIndexOf(1));



// var filtered = combine.filter((x) => { if (x <= 15)  return 15; } );
// console.log(`filtered array: ${filtered}`);


// // names.forEach((name) => console.log(`Howdy ${name}`));


// console.log(filtered.every((num) => num < 10));
// console.log(filtered.every((num) => num < 16));

// console.log(fibonacci.some((num) => num > 50));
// console.log(fibonacci.some((num) => num > 100));



// -- error handling



// let a = 7 * undefined / "panama";
// console.log(a);


// function beforeTryCatch() {
//   let obj = undefined;
//   console.log(obj);
//   console.log('This will not be executed and users\'');
// }
 
// beforeTryCatch();
// function someFunction() {
//   try {
//       // Functionality that might cause an error
//       // For example:
//       let x = y; // This will throw a ReferenceError since y is not defined
//   } catch (error) {
//       // Handling the error
//       console.error("An error occurred within someFunction:", error);
//       // Optionally, you can rethrow the error to propagate it further
//       throw error;
//   }
// }

// // Calling the function
// try {
//   someFunction();
// } catch (error) {
//   // Handling the error that occurred during the function call
//   console.error("An error occurred while calling someFunction:", error);
// }


// function afterTryCatch() {
//   try {

//     let obj = undefined;
//     console.log(obj.b);
//     console.log('This will not be executed and users\'');

//   } catch (error) {
   
//     console.log(`Caught an error: ${error.message}`);

//   } finally {

//     console.log('Clearing it');

//   }

//   console.log('My application continued');

// }

// afterTryCatch();

// try {
//   let userInput = prompt("Please enter a number:");
//   if (isNaN(userInput)) {
//       throw new Error("Input is not a number");
//   }
//   console.log("User input is:", parseInt(userInput));
// } catch (error) {
//   console.error("An error occurred:", error.message);
// }


// function performCalculation(butang) {
//   if (!butang.hasOwnProperty('b')) {
//     throw new Error('Object missing property USIK KAAYO PLASTIC');
//   }
//   // continue with calculation
//   return butang.b * 10;
// }

// function performHigherLeverOperation() {
//   let obj = {x: 4}; // set this to empty to be able to show the error handling sample
//   let value = 0;
//   let computeIt = 1;

//   try {
//     value = performCalculation(obj);
//   } catch (error) {
//     console.log(error.message);
//     computeIt = 0;
//   }

//   if (computeIt) {
//     console.log(`the value is: ${value}`);
//   }
// }

// performHigherLeverOperation();


