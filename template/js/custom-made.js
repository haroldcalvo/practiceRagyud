function addDisabledClassToElements() {
  // Get all elements on the page
  const allElements = document.querySelectorAll('*');

  // Loop through each element and check if it has the 'disabled' attribute
  allElements.forEach(element => {
    if (element.hasAttribute('disabled')) {
      // Add the 'disabled' class to the element
      element.classList.add('disabled');
    }
  });
}