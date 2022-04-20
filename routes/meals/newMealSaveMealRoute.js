const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');

const retrieveMulterImage = require('../../utils/retrieveMulterImage');
const uploadToImageKit = require('../../utils/imageUploaderImageKit');
const defineNewMeal = require('../../utils/defineNewMeal');
const saveMealToMongoDb = require('../../utils/saveMealToMongoDb');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  '/',
  // Server side validation
  check('multerFilenameInput').notEmpty().isString().withMessage('Image is required'),
  check('multerFilePathInput').notEmpty().isString().withMessage('Server error. Must be string'),
  check('mealName').notEmpty().isString().withMessage('Meal Name is required'),
  check('mealCategory').notEmpty().isString().withMessage('Select a meal category'),
  check('mealDesription').notEmpty().isString().withMessage('Server error. Must be string'),

  async (req, res) => {
    console.log('################# req.body #####################');
    console.log(req.body);
    console.log('################################################');

    // Server side validation, error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors[0].msg;
      console.log(JSON.stringify(errors));
      console.log({ errors: errors.array() });
      req.flash('danger', errorMessage);
      return res.status(400).render('addNewMeal');

    } else {

      try {
        const imageToBeUploaded = req.body.multerFilenameInput;

        const file = retrieveMulterImage(imageToBeUploaded); //returns file object

        const result = await uploadToImageKit(file, imageToBeUploaded); //returns object with results from imageKit upload

        const meal = defineNewMeal(result, req.body); //builds together the meal data from form fields and imagekit results. Returns object with all data for the meal.

        // save the new meal to mongoDb. Returns object of all document data saved
        const savedMeal = await saveMealToMongoDb(meal);

        // extracting this so can use the id to redirect to mealdetails page of saved meal.
        const mealId = savedMeal.id;

        // redirect user to page with details of the new meal
        req.flash('success', 'New Meal Saved');
        res.redirect('/meals/meal/' + mealId);
      } catch (err) {
        console.log('in NewMeal: Mongo and ImageKit POST/UPLOAD error');
        console.log(err);
        res.status(500).json('Ops, something went wrong')
        //   res.render('error', { err });
      }
    }
  }
);

module.exports = router;
