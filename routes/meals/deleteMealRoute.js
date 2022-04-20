const express = require('express');
const session = require('express-session'); //Messaging: stores session
const flash = require('connect-flash'); //Messaging: stores the messages
const messages = require('express-messages'); //Messaging: shows the messages

const router = express.Router();
const fs = require('fs'); // using multer to save image local server disk
const { promisify } = require('util'); // for deleting local image after POST/PUT upload to imagekit
const unlinkAsync = promisify(fs.unlink); // for deleting local image after POST/PUT upload to imagekit
const Meal = require('../../models/mealSchema'); // Mongoose db model

// Image upload
const ImageKit = require('../../utils/imagekit');
const uploadMulter = require('../../utils/multer');

// Imagekit and atlas mongo credentials
require('dotenv').config();

// HEADING: Route to delete a meal by id
router.get('/:id', async (req, res) => {
  try {
    // Find the meal in cloud Mongo db
    const meal = await Meal.findById(req.params.id);

    // For the redirect back to meal category
    const mealCategory = meal.mealCategory;

    console.log(`Meal to be deleted is ${meal}`);
    if (!meal) {
      const message = 'Meal not found in Mongo db';
      res.render('error', { message });
      return error;
    }
    // Delete meal image in imageKit
    await ImageKit.imagekit.deleteFile(meal.imagekitImageId);

    // Delete meal document in mongoDb
    await Meal.deleteOne(meal);

    
    req.flash('success', 'Meal Deleted');
    // http://localhost:3005/meals/category/mains?page=1&limit=5
    // /meals/category/(/:var(mains|breakfast|snacks)?page=1&limit=5
    // router.get('/:var(mains|breakfast|snacks)'
    res.redirect('/meals/category/'+mealCategory+'?page=1&limit=5');
  //   setTimeout(function(){

  // }, 2000);
  // setTimeout();
    // res.render('deleteMealSuccess', { meal });
    // res.render('deleteMealSuccess', { meal });
  } catch (error) {
    console.dir(error);
  }
});

module.exports = router;
