const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const defineNewMeal = require('../../utils/defineNewMeal');
const { updateImagekitTag } = require('../../utils/imagekit');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post(
  '/',
  // Server side validation
  check('mealName').notEmpty().isString().withMessage('Meal Name is required'),
  check('mealCategory').notEmpty().isString().withMessage('Select a meal category'),
  check('mealDesription').isString().withMessage('Server error. Must be string'),

  async (req, res) => {
    // At this point of submitting the form, meal image has already been uploaded in front end with a tag "temp"
    console.log('POST Route; Saving new meal. req.body below');
    console.log(req.body);

    // Server side validation, error handling
    console.log('Validation');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors[0].msg;
      console.log(JSON.stringify(errors));
      console.log({ errors: errors.array() });
      req.flash('danger', errorMessage);
      return res.status(400).render('addNewMeal');
    } else {
      try {
        // define the meal
        const meal = await defineNewMeal(req.body);

        // save to db
        const savedMeal = await meal.save();

        // in case user aborts saving a meal, images with "temp" tag are deleted during cleanup
        //imagekit db: removes tag "temp", adds new tag with db-id showing image has corresponding meal in db.
        const mealId = savedMeal.id;
        const tag = `db-` + mealId;
        const file_id = savedMeal.imagekitImageId;
        updateImagekitTag(file_id, tag);

        // redirect user to page with details of the new meal
        console.log('redirecting');
        req.flash('success', 'New Meal Saved');
        res.redirect('/meals/meal/' + mealId);
      } catch (err) {
        console.log('in NewMeal: Mongo and ImageKit POST/UPLOAD error');
        console.log(err);
        res.status(500).json('Ops, something went wrong');
      }
    }
  }
);

module.exports = router;
