$(document).ready(function () {
    // Initial state
    checkCheckbox();

    // Add change event listener to the checkbox
    $("#CalendarCheked").change(function () {
        checkCheckbox();
    });

    // Function to check the state of the checkbox and toggle the visibility of From and To inputs
    function checkCheckbox() {
        if ($("#CalendarCheked").prop("checked")) {
            // Checkbox is checked, hide From and To inputs
            $("#from-to-div").hide();
            $("#calendar-div").show();
        } else {
            // Checkbox is unchecked, show From and To inputs
            $("#calendar-div").hide();
            $("#from-to-div").show();
        }
    }
});
