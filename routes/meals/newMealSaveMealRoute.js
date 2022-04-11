const express = require('express');
const router = express.Router();

const retrieveMulterImage = require('../../utils/retrieveMulterImage');
const uploadToImageKit = require('../../utils/imageUploaderImageKit');
const defineNewMeal = require('../../utils/defineNewMeal');
const saveMealToMongoDb = require('../../utils/saveMealToMongoDb');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  console.log(
    '#################################################'
  );
  console.log(req.body);
  console.log(
    '########################################'
  );

  try {
    const imageToBeUploaded = req.body.multerFilenameInput;

    const file = retrieveMulterImage(imageToBeUploaded); //returns file object

    const result = await uploadToImageKit (file, imageToBeUploaded);//returns object with results from imageKit upload

    const meal = defineNewMeal(result, req.body);//builds together the meal data from form fields and imagekit results. Returns object with all data for the meal.


    // save the new meal to mongoDb. Returns object of all document data saved
    const savedMeal = await saveMealToMongoDb(meal);

    // extracting this so can use the id to redirect to mealdetails page of saved meal.
    const mealId = savedMeal.id;

    // redirect user to page with details of the new meal
    res.redirect('/meals/meal/' + mealId);

  } catch (err) {
    console.log('in NewMeal: Mongo and ImageKit POST/UPLOAD error');
    console.log(err);
    //   res.render('error', { err });
  }
});

module.exports = router;
