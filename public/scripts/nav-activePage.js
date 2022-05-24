// CSS file has settings defined to highlight active page in navbar
// settings are applied to class named is-active
// This script loops through the nav li's comparing if its innerText matches location.Pathname
// and adds the class is-active when match is found.
console.log("nav-active-page script running")
const arrPaths = location.pathname.split('/');

// Gets last element from array
const currentPage = arrPaths[arrPaths.length - 1];
console.log(currentPage);

// Object containing HTLM list of more objects per element (li)
const activeStateItems = document.getElementsByClassName('activeState');

// Loop through the list items with class of activeState
for (const activeStateItem of activeStateItems) {
  if (
    // checking if Mains==mains or Breakfast===breakfast
    activeStateItem.innerText.toLowerCase() === currentPage.toLowerCase() ||
    // checking if Home ==="empty string"
    (activeStateItem.innerText.toLowerCase() === 'home' &&
      currentPage.toLowerCase() === '') ||
    // checking if Cakes & Snacks ==="cakessnacks"
    (activeStateItem.innerText.toLowerCase() === 'snacks' &&
      currentPage.toLowerCase() === 'cakessnacks')
  ) {
    //   if any of above matches add class of is-active to the list item
    activeStateItem.classList.add('is-active');
  }
}
