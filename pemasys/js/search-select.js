//===================================================================
//Function: autocomplete
//Purpose: This is the function used to make the search select possible.
//Author: James Carl Sitsit
//Parameter:
//  Name                 Comment
//  -----------          --------------------------------
//  inp                  This is the html input where you want to have a search-select
//  arr                  Array of data for the search-select to populate
//  url                  Service URL for searching by name.
//  type                 Identifier what data will you want to be populated.
//
//Result:
// serviceResponse (ServiceResponse Class)
//===================================================================
function autocomplete(inp, arr, store) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("keyup", function(e) {
        var a, b, i, val = this.value;
        let p;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        // if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.setAttribute("style", "overflow-y:scroll;");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          caps = arr[i]["label"].toUpperCase();
          p = caps.indexOf(val.toUpperCase());
          pmin = p-1;
          /*check if the item starts with the same letters as the text field value:*/
          if(e.key == "Enter" && val == ""){
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i]["label"]; 
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i]["label"] + "'>";
            b.innerHTML += "<input type='hidden' value='" + arr[i]["id"] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                document.getElementById(store).value = this.getElementsByTagName("input")[1].value;
                searchSelect();
                // var a = document.getElementById("containerForpersonID1").value.split(",");
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
         }else{
          if (arr[i]["label"].substr(p, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i]["label"].substr(0, p);
            b.innerHTML += "<strong>" + arr[i]["label"].substr(p, val.length) + "</strong>";
            b.innerHTML += arr[i]["label"].substr(val.length+p);

            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i]["label"] + "'>";
            b.innerHTML += "<input type='hidden' value='" + arr[i]["id"] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                document.getElementById(store).value = this.getElementsByTagName("input")[1].value;
                searchSelect();
                // var a = document.getElementById("containerForpersonID1").value.split(",");
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
         }

        }

    });
    /*execute a function presses a key on the keyboard:*/
    // inp.removeEventListener("keyup", );
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//===================================================================
//Function: autocomplete
//Purpose: This is the function used to make the search select possible.
//Author: James Carl Sitsit
//Parameter:
//  Name                 Comment
//  -----------          --------------------------------
//  inp                  This is the html input where you want to have a search-select
//  arr                  Array of data for the search-select to populate
//  url                  Service URL for searching by name.
//  type                 Identifier what data will you want to be populated.
//
//Result:
// serviceResponse (ServiceResponse Class)
//===================================================================
function autocompleted(inp, arr, store) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("keydown", function(e) {
      var a, b, i, val = this.value;
      let p;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      // if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      a.setAttribute("style", "overflow-y:scroll;");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        caps = arr[i]["label"].toUpperCase();
        p = caps.indexOf(val.toUpperCase());
        pmin = p-1;
        /*check if the item starts with the same letters as the text field value:*/
        if(e.key == "Enter" && val == ""){
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i]["label"]; 
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i]["label"] + "'>";
          b.innerHTML += "<input type='hidden' value='" + arr[i]["id"] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              document.getElementById(store).value = this.getElementsByTagName("input")[1].value;
              searchSelect();
              // var a = document.getElementById("containerForpersonID1").value.split(",");
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
       }else{
        if (arr[i]["label"].substr(p, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i]["label"].substr(0, p);
          b.innerHTML += "<strong>" + arr[i]["label"].substr(p, val.length) + "</strong>";
          b.innerHTML += arr[i]["label"].substr(val.length+p);

          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i]["label"] + "'>";
          b.innerHTML += "<input type='hidden' value='" + arr[i]["id"] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              document.getElementById(store).value = this.getElementsByTagName("input")[1].value;
              searchSelect();
              // var a = document.getElementById("containerForpersonID1").value.split(",");
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
       }

      }

  });
  /*execute a function presses a key on the keyboard:*/
  // inp.removeEventListener("keyup", );
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
//===================================================================
//Function: autocomplete1
//Purpose: This is the function used to make the search select possible.
//Author: James Carl Sitsit
//Parameter:
//  Name                 Comment
//  -----------          --------------------------------
//  inp                  This is the html input where you want to have a search-select
//  arr                  Array of data for the search-select to populate
//  url                  Service URL for searching by name.
//  type                 Identifier what data will you want to be populated.
//  desID                Destination ID
//  srcID                Source ID
//
//Result:
// serviceResponse (ServiceResponse Class)
//===================================================================
function autocomplete1(inp, arr, url, desID, srcID, type) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let containerForunititemID = document.getElementById("containerForunititemID");
  let storeitemID = document.getElementById("containerForitemID");
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      let p;
      if (arr.indexOf(inp.value) == -1) {
        clearAllIDContainer()
      }else{
        invokeServiceForIDStorage();
      }
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      a.setAttribute("style", "overflow-y:scroll;");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        caps = arr[i].toUpperCase();
        p = caps.indexOf(val.toUpperCase());
        pmin = p-1;
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(p, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i].substr(0, p);
          b.innerHTML += "<strong>" + arr[i].substr(p, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length+p);

          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              invokeServiceForIDStorage();
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }

  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  function clearAllIDContainer(){
    if(type == "adjustmentItem"){
      storeitemID.value = ""; 
    }
  }
  function invokeServiceForIDStorage(){
    var response;
    if(type == "adjustmentItem"){
      response = response = InvokeService(url + inp.value + "&destination_id=" + desID + "&source_id=" + srcID,  "GET", "");
    }else{
      response = InvokeService(url + inp.value, "GET", "");
    }
    var data;
    if (response.code == 200) {
        var data = JSON.parse(response.data);
        var parsedData = JSON.parse(data.jsonData);
        if(type == "adjustmentItem"){
          storeitemID.value = parsedData[0].item_id;
          populateEssentialsfromItem();
          // storeUnitItemID();
        }                  
    }
  }
}
