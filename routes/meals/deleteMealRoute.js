const express = require('express');
const router = express.Router();
const Meal = require('../../models/mealSchema'); // Mongoose db model

// Image upload
const ImageKit = require('../../utils/imagekit');

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
    res.redirect('/meals/category/'+mealCategory+'?page=1&limit=5');

  } catch (error) {
    console.dir(error);
  }
});

module.exports = router;
