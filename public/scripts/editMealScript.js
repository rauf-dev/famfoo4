// Populating the textarea field with meal description using a view engine output tag causes issues
// because it adds whitespace and linebreaks which are then saved as "new" edits.
// This issue repeats with each edit meal save regardless if the description was edited or not.
// Easiest fix is to always trim the string when page is loaded.

// Setting meal category radio select

function trimStringAndSetCheckedMealCategory() {
  //MEAL DESCRIPTION
  const mealDescription = document.getElementById('mealDescription');
  const hiddenMealDescription = document.getElementById(
    'hiddenMealDescription'
  );

  // remove whitespace and append meal description to textarea
  let strMealDesc = hiddenMealDescription.value;
  strMealDesc.trim();
  mealDescription.value = strMealDesc;

  // MEAL CATEGORY
  //   Set radio select to checked as per meal category
  console.log('setting category');
  const mealCategoryMains = document.getElementById('mealCategoryMains');
  const mealCategoryBreakfast = document.getElementById(
    'mealCategoryBreakfast'
  );
  const mealCategorySnacks = document.getElementById('mealCategorySnacks');
  const mealCategoryValue = document
    .getElementById('hiddenMealCategorySnacks')
    .value.toLocaleLowerCase()
    .trim();

  if (mealCategoryValue == 'mains') mealCategoryMains.checked = true;
  if (mealCategoryValue == 'breakfast') mealCategoryBreakfast.checked = true;
  if (mealCategoryValue == 'snacks') mealCategorySnacks.checked = true;
}

// `DOMContentLoaded` may fire before your script has a chance to run, so check before adding a listener
if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    trimStringAndSetCheckedMealCategory
  );
} else {
  // `DOMContentLoaded` already fired
  trimStringAndSetCheckedMealCategory();
}
