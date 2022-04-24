const express = require('express');
const router = express.Router();
const Meal = require('../../models/mealSchema');

const { body, validationResult, check } = require('express-validator'); //Validation

const retrieveMulterImage = require('../../utils/retrieveMulterImage');
// const { uploadToImageKit, deleteImageInImageKit } = require('../../utils/imageUploaderImageKit');

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
    console.log('###########################');
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
        if (req.body.multerFilenameInput) {
          const imageToBeUploaded = req.body.multerFilenameInput;

          //retrieves file object from multer local storage
          const file = retrieveMulterImage(imageToBeUploaded); //returns file object

          //  --> then upload file to imagekitb
          const result = await uploadToImageKit(file, imageToBeUploaded); //returns object with results from imageKit upload

          // populate new image data
          mealPostEdit['imageName'] = result.name;
          mealPostEdit['imageLocation'] = result.url;
          mealPostEdit['imageThumbnail'] = result.thumbnailUrl;
          mealPostEdit['imagekitImageId'] = result.fileId;

          //delete old meal image from imagekit
          const resultDeleteImagekitImage = await deleteImageInImageKit(
            mealPreEdit.imagekitImageId
          );
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
