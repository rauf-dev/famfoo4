const express = require('express');
const router = express.Router();
const Meal = require('../../models/mealSchema');

//Validation
const { body, validationResult, check } = require('express-validator');

const retrieveMulterImage = require('../../utils/retrieveMulterImage');
const {
  uploadToImageKit,
  deleteImageInImageKit,
} = require('../../utils/imageUploaderImageKit');

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

  check('mealName')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('Meal Name is required'),
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

        // check if new image uploaded to multer
        console.log(req.body);
        if (req.body.multerFilenameInput) {
          console.log('filenameinput exists');
          //  --> if yes, define 'file'
          const imageToBeUploaded = req.body.multerFilenameInput;
          const file = retrieveMulterImage(imageToBeUploaded); //returns file object
          //  --> then upload from multer to imagekitb
          const result = await uploadToImageKit(file, imageToBeUploaded); //returns object with results from imageKit upload
          //  --> and return the results from imagekit
          console.log(result);

          mealPostEdit['imageName'] = result.name;
          mealPostEdit['imageLocation'] = result.url;
          mealPostEdit['imageThumbnail'] = result.thumbnailUrl;
          mealPostEdit['imagekitImageId'] = result.fileId;

          console.log(mealPostEdit);

          //  --> and then delete old meal image from imagekit
          const resultDeleteImagekitImage = await deleteImageInImageKit(
            mealPreEdit.imagekitImageId
          );
          console.log('deleted old imagekit image');
          console.log(resultDeleteImagekitImage);
        }
        console.log(
          `length req.body.mealName: ${
            req.body.mealName.toLowerCase().trim().length
          }, length preEdit mealName: ${
            mealPreEdit.mealName.toLowerCase().trim().length
          }`
        );
        console.log(
          `type of req.body.mealDescription: ${typeof req.body
            .mealDescription}, typeof preEdit mealName: ${typeof mealPreEdit.mealDescription}`
        );
        console.log(
          `req.body.mealName: ${req.body.mealName}, preEdit mealName: ${mealPreEdit.mealName}`
        );
        console.log(
          ` != ${req.body.mealName.trim() != mealPreEdit.mealName.trim()}`
        );
        console.log(
          ` !== ${req.body.mealName.trim() !== mealPreEdit.mealName.trim()}`
        );

        if (req.body.mealName != mealPreEdit.mealName) {
          mealPostEdit['mealName'] = req.body.mealName;
        }

        if (
          req.body.mealDescription != mealPreEdit.mealDescription
        ) {
          mealPostEdit['mealDescription'] = req.body.mealDescription;
        }

        if (req.body.mealCategory != mealPreEdit.mealCategory) {
          mealPostEdit['mealCategory'] = req.body.mealCategory;
        }

        console.log(`mealName Post Edit; ${mealPostEdit.mealName}`);

        await Meal.findByIdAndUpdate(req.params.id, mealPostEdit, {
          new: true,
        });

        // FINALLY AFTER ALL CHANGES, show meal details page of edited meal
        // query mongoDB
        const meal = await Meal.findById(req.params.id);
        console.log({ meal });
        req.flash('success', 'Edit Saved');
        res.render('./mealDetailsPage', { meal });

      } catch (err) {
        console.log('in EDIT MEAL error');
        console.error(err);
        res.status(500).json('Ops, something went wrong')
      }
    }
  }
);

module.exports = router;
