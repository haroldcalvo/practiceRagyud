// console.log('Practice starts here.');

// -- variable declaration - var and let
// let intVariableA;
 
// let intVariableA;
//  let strSample;

// intVariableA = 5;
// strSample = ' The quick';
// $('.practiceJs').append(intVariableA + strSample);

// -- data types


// -- coercion
// let intNumber_1 = 5;
// let strNumber_1 = '5';
// let decNumber;

// decNumber = 1.05;

// let intSum = intNumber_1 + strNumber_1;
// console.log('Before conversion ' + intSum);
// intSum = intNumber_1 + parseInt(strNumber_1);
// console.log('After conversion ' + intSum);
// console.log(intSum); 


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
let intSeriesOfNumbers = [ 10, 20, 30, 40, 50 ];
let strListOfNames = ['Pedro', 'Kulas', 'Maria', 'Juan', 'Petra'];

// console.log(intSeriesOfNumbers);
// console.log(intSeriesOfNumbers[2]);

// console.log(strListOfNames[1]);
// console.log(strListOfNames.length);
// console.log(strListOfNames[10]);

// let objVarious = ['Ramon', 'Juyot', 25, true];
// console.log(objVarious);

// console.log(a);
// console.log(typeof a);
// access beyond length


// sparse
// console.log(`Length of array BEFORE: ${intSeriesOfNumbers.length}`);
// intSeriesOfNumbers[10] = 100;
// console.log(intSeriesOfNumbers);
// console.log(`Length of array AFTER: ${intSeriesOfNumbers.length}`);
// console.log(`This the current value inside the array${intSeriesOfNumbers}`);
// console.log(`This is the current length of an array ${intSeriesOfNumbers.length}`);
// console.log(`Now we will use the method pop so we can get the last element from the array`);
// intSeriesOfNumbers.pop();
// console.log(`This the current value inside the array after i use the pop method ${intSeriesOfNumbers}`);
// console.log(`As we can see the value of an array is missing the last value which is 50 cause we're using the pop() method`);
// console.log(`---------------------------------------------------`);
// console.log(`Now we are gonna try the push() method which is reversed method of pop()method`);
// console.log(`This the current value inside the array${intSeriesOfNumbers}`);
// console.log(`Now we will use the method push so we can put an last element to the array`);
// intSeriesOfNumbers.push(100);
// console.log(`This the current value inside the array after i use the push method ${intSeriesOfNumbers}`);

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


// function sayHi() {
//   console.log('Hi...');
// }

// function sayHello(strName) {
//   // console.log('Hello ' + strName);
//   console.log(`Hello ${strName}`);
// }

// sayHi();
// sayHi;
// let sayHai = sayHi;
// sayHai();

// sayHello('Peter');

// let a = sayHello;
// a('Kulas - invoked function through a variable');
// console.log('------ calling function without parameter -----');
// a();


// let decLoanAmount = 1000.00;
// let decLoanRate = .05;
// function computeInterestDue(decPrincipal, decInterestRate) {
//   let decInterestDue = decPrincipal * decInterestRate;
//   return decInterestDue;
// } 
// console.log(computeInterestDue(decLoanAmount, decLoanRate));
// console.log(`The computed interest due for principal ${decLoanAmount} with a rate of ${decLoanRate} is ${computeInterestDue(decLoanAmount, decLoanRate)}`);

// -- function expressions


// (function () {
//   console.log('A Function with no name...');
//   console.log('Immediately invoke function expression');
// })();



// let funcNoName = (function () {
//   console.log('A Function with no name...');
//   console.log('Immediately invoke function expression');

//   return (function(){
//     console.log(`ambot lang`);
//   })
// })();

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


// let intTemp;

// for (i = 1; i < 5; i++) {
//   console.log(` UNA the value of variable "i" in this loop is ${i}`);
//   console.log('----- test increment ---');
//   intTemp = ++i;
//   // intTemp = (i * 1);
//   console.log(`IKADUHA Value of "i" is ${i} value of "intTemp" ${intTemp}`);
//   console.log(`IKATULO Value of "i" is ${i} value of "intTemp" using incrementor before display ${intTemp}`);
// }


/*
for (i = 0; i < strListOfNames.length; i++) {
  console.log(`The content of variable "strListOfNames[${i}]" is ${strListOfNames[i]}`);
}
*/

// intSeriesOfNumbers.forEach( (intNumber) => { console.log(`Content ${intNumber}`) });
// for (i = 0; i < intSeriesOfNumbers.length; i++) {
//   console.log(`Content ${intSeriesOfNumbers[i]}`);
// };

// scope basics


// module pattern


// closure


// `this` keyword


// destructuring


// regex


// natives


// constructors


// classes


// arrow functions


// null


// dates


// string


// array method



// error handling