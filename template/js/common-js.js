
function numberFormatterDecimal() {
    //!NUMBER FORMATTER

    var class_name = 'number-format-decimal';

    var inputElements = document.getElementsByClassName(class_name);
    
    for (var i = 0; i < inputElements.length; i++) {
        // Remove any non-numeric characters
        let value = inputElements[i].textContent.replace(/[^\d.]/g, '');

        // Split the value into integer and decimal parts
        let parts = value.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1];

        // Add commas for thousands separators
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Limit decimal part to two digits
        if (decimalPart !== undefined) {
            decimalPart = decimalPart.slice(0, 2);
            value = integerPart + '.' + decimalPart;
        } else {
            value = integerPart;
        }
        
        inputElements[i].textContent = value;
        inputElements[i].setAttribute('maxlength', '16');
        inputElements[i].style.textAlign = 'right';
    }

    document.addEventListener('keyup', function(event) {
        var target = event.target;

        if (target.classList.contains(class_name)) {
            // Remove any non-numeric characters
            let value = target.value.replace(/[^\d.]/g, '');

            // Split the value into integer and decimal parts
            let parts = value.split('.');
            let integerPart = parts[0];
            let decimalPart = parts[1];

            // Add commas for thousands separators
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            // Limit decimal part to two digits
            if (decimalPart !== undefined) {
                decimalPart = decimalPart.slice(0, 2);
                value = integerPart + '.' + decimalPart;
            } else {
                value = integerPart;
            }

            // Update the input value
            target.value = value;
        }
    });
    document.addEventListener('blur', function(event) {
        var target = event.target;
    
        if (target.classList.contains(class_name)) {
            var inputValue = target.value;

            // Check if the input value doesn't already have a decimal point
            if (inputValue.indexOf('.') === -1) {
                // Append a decimal point and '0' if no decimal places are present
                target.value = inputValue + '.00';
            }
        }
    }, true);// Use "true" to capture the event during the capture phase
}
function dateFormatter() {
    //!DATE FORMATTER
    //window.onload = function() {

        var year,month,day;

        function dateFormat() {
            return `${month}/${day}/${year}`;
        }

        var inputElements = document.getElementsByClassName("date-format-input");

        // Loop through the collection and format the date for each input field
        for (var i = 0; i < inputElements.length; i++) {
            var value = inputElements[i].value;
            var date = new Date(value); // Convert the value to a Date object
            year = date.getFullYear();
            month = date.getMonth() + 1; // Months start at 0!
            day = date.getDate();
            
            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            var formattedDate = dateFormat();
            inputElements[i].value = formattedDate;
            //inputElements[i].placeholder = value;
        }

        var formattedLabel = document.getElementsByClassName("date-format-text");
        
        // Loop through the collection and format the date for each input field
        for (var i = 0; i < formattedLabel.length; i++) {
            var value = formattedLabel[i].textContent;
            var date = new Date(value); // Convert the value to a Date object
            year = date.getFullYear();
            month = date.getMonth() + 1; // Months start at 0!
            day = date.getDate();
            
            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            var formattedDate = dateFormat();
            formattedLabel[i].textContent = formattedDate;
        }
    //};
}

function firstLetterCapitalize(str) {
    //split the above string into an array of strings 
    //whenever a blank space is encountered
    
    const arr = str.split(" ");
    //loop through each element of the array and capitalize the first letter.
  
  
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    return arr.join(" ");

  }
  function capitalizeEachWord(str) {
    if (!str || typeof str !== 'string') {
        // Handle null, undefined, or non-string values
        return str;
    }

    return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase();
    });
}