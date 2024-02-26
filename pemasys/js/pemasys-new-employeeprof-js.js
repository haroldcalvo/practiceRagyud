
$(document).ready(function () {
  showTab(currentTab);

  var prevButton = document.getElementById("prevBtn");
  prevButton.addEventListener("click", function () {
    nextPrev(-1);
  });

  var nextButton = document.getElementById("nextBtn");
  nextButton.addEventListener("click", function () {
    nextPrev(1);
  });

  function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (currentTab == x.length) {
      currentTab = currentTab - 1;
    }
    var prev = currentTab;

    if (n == 1 && !validateForm()) return false;

    currentTab = currentTab + n;
    // if(currentTab < (x.length - 1)){
    //   x[prev].style.display = "none";
    // }

    if (currentTab == x.length) {
      // document.getElementById("myForm").submit();
      saveEmployeeProfile();
      return false;
    } else {
      x[prev].style.display = "none";
    }

    showTab(currentTab);
  }

  function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByClassName("validate"); // Only validate elements with class "validate"
    var addformElements = $(x[currentTab]).find('.addform');

    for (i = 0; i < y.length; i++) {
      if (y[i].value == "") {
        y[i].classList.add("invalid");
        valid = false;
      } else {
        y[i].classList.remove("invalid");
      }
    }

    addformElements.each(function() {
      const content = $(this).html().trim();
      const errorMessage = '<span class="msg-container status--denied">Please ensure that at least one form is added before proceeding.</span>';

      if (content === "" || content === errorMessage) {
        $(this).html(errorMessage);
        valid = false;
      }
    });

    if (valid) {
      document.getElementsByClassName("step")[currentTab].classList.add("finish");
    }

    return valid;
  }

});

// FAMILY BACKGROUND
$(document).ready(function () {

  var add_parent = $("#add-parent");

  $(add_parent).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-parent", null, "Save", '.parent-section', parentDetailsHtml, true);
  });
});

//IN CASE OF EMERGENCY
$(document).ready(function () {

  var add_emergency = $("#add-emergency");

  $(add_emergency).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-emergency", null, "Save", '.emergency-section', contactDetailsHtml, true);
  });
});

//BENEFICIARY
$(document).ready(function () {

  var add_beneficiary = $("#add-beneficiary");

  $(add_beneficiary).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-beneficiary", null, "Save", '.beneficiary-section', beneficiaryDetailsHtml, true);

  });
});

//DEPENDENTS
$(document).ready(function () {

  var add_dependents = $("#add-dependents");

  $(add_dependents).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-dependents", null, "Save", '.dependents-section', dependentDetailsHtml, true);
  });
});

//EMPLOYMENT HISTORY
$(document).ready(function () {

  var add_employment_history = $("#add-employment-history");

  $(add_employment_history).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-employment-history", null, "Save", '.employment-history-section', employmentHistoryHtml, true);
  });
});

$(document).ready(function () {

  var add_school = $("#add-school");

  $(add_school).click(function (event) {
    event.preventDefault();
    scrollModal("#employeeProfileModal", "Up");
    addSectionDetails("#input-container-school", null, "Save", '.education-section', educationBackgroundHtml, true);
  });
});

$(document).ready(function () {

  var add_other_ids = $("#add-other-ids");

  $(add_other_ids).click(function (event) {
    event.preventDefault();
    addSectionDetails("#other-ids-container", null, "Save", '.id-section', identificationCardsHtml, false);
  });
});

$(document).ready(function () {

  var add_counter_party = $("#add-counter-party");

  $(add_counter_party).click(function (event) {
    event.preventDefault();
    addSectionDetails("#counter-party-container", null, "Save", '.counter-party-section', counterPartyHtml, false);
  });
});


// $(document).ready(function () {
//   function setupSection(sectionId, sectionDetailsHtml, isModalScroll) {
//     var addButton = $(`#add-${sectionId}`);
//     var container = $(`#input-container-${sectionId}`);

//     addButton.click(function (event) {
//       event.preventDefault();
//       if (isModalScroll) {
//         scrollModal("#employeeProfileModal", "Up");
//       }
//       addSectionDetails(container, null, "Save", `.${sectionId}-section`, sectionDetailsHtml, true);
//     });
//   }

//   ["parent", "emergency", "beneficiary", "dependents", "employment-history", "school"].forEach(function (sectionId) {
//     setupSection(sectionId, window[`${sectionId}DetailsHtml`], true);
//   });

//   $("#add-other-ids, #add-counter-party").click(function (event) {
//     event.preventDefault();
//     var containerId = $(this).attr("id") === "add-other-ids" ? "other-ids-container" : "counter-party-container";
//     addSectionDetails(`#${containerId}`, null, "Save", `.${containerId}-section`, window[`${containerId}Html`], false);
//   });
// });

