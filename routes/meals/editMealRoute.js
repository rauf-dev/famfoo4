const express = require('express');
const router = express.Router();
const Meal = require('../../models/mealSchema');

const { body, validationResult, check } = require('express-validator'); //Validation

const { deleteImageById } = require('../../utils/imagekit');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET EDIT MEAL PAGE
router.get('/:id', async (req, res) => {
  console.log('IN EDIT MEAL ROUTE');
  const meal = await Meal.findById(req.params.id);
  res.render('editMealPage', { meal });
});

// SAVE EDITED MEAL ROUTE
router.post(
  '/:id',
  // Server side validation

  check('mealName').notEmpty().isString().trim().withMessage('Meal Name is required'),
  check('mealCategory').isString().trim().withMessage('Select a meal category'),
  check('mealDescription').isString().trim().withMessage('Server error. Must be string'),
  async (req, res) => {
    console.log('in edit meal post route');

    // Server side validation, error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors[0].msg;
      console.log(JSON.stringify(errors));
      console.log({ errors: errors.array() });
      req.flash('danger', errorMessage);
      return res.status(400).render('/meals/edit/<%= req.params.id%>');
    } else {
      try {
        let mealPreEdit = await Meal.findById(req.params.id);
        let mealPostEdit = {};

        // check if image edited
        console.log(req.body);
        if (req.body.imageName) {
          // populate new image data
          mealPostEdit['imageName'] = req.body.imageName;
          mealPostEdit['imageLocation'] = req.body.imageLocation;
          mealPostEdit['imageThumbnail'] = req.body.imageThumbnail;
          mealPostEdit['imagekitImageId'] = req.body.imagekitImageId;
        }

        // check for edits
        if (req.body.mealName != mealPreEdit.mealName) {
          mealPostEdit['mealName'] = req.body.mealName;
        }
        if (req.body.mealDescription != mealPreEdit.mealDescription) {
          mealPostEdit['mealDescription'] = req.body.mealDescription;
        }
        if (req.body.mealCategory != mealPreEdit.mealCategory) {
          mealPostEdit['mealCategory'] = req.body.mealCategory;
        }

        // Save all edits to db
        await Meal.findByIdAndUpdate(req.params.id, mealPostEdit, {
          new: true,
        });

        //load the meal with all edits included
        const meal = await Meal.findById(req.params.id);

        //delete old meal image from imagekit
        const file_id = mealPreEdit.imagekitImageId;
        const deleteImageResult = await deleteImageById(file_id);
        console.log(deleteImageResult);

        //show flash message
        req.flash('success', 'Edit Saved');

        // Show meal details page of newly edited meal
        res.render('./mealDetailsPage', { meal });
      } catch (err) {
        console.log('in EDIT MEAL error');
        console.error(err);
        res.status(500).json('Ops, something went wrong');
      }
    }
  }
);

module.exports = router;
