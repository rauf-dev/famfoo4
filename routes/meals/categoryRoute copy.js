const express = require('express');
const router = express.Router();
const Meals = require('../../models/mealSchema');

// /meals/category/x
router.get('/:var(mains|breakfast|snacks)', async (req, res) => {
  try {
    // build mongoDB category query
    // Uses originalURL to determine category selected
    // returns e.g. { mealCategory: 'breakfast' }
    const queryAllMealsInCategory = function(){
      const queryAll = {'mealCategory': req.originalUrl.split('/')[3]};
      return queryAll; 
    }
let meals = {};
    list.result = await Meals.find(queryAllMealsInCategory()).sort({
      uploadDate: 'desc',
    });
    // list.result2 = await Meals.find(queryAllMealsInCategory()).sort({
    //   uploadDate: 'desc',
    // });


    // const totalMealsInCategory = await Meals.find(queryAllMealsInCategory()).count();
    // console.log(totalMealsInCategory);

    //query mongo db for all meals in specific category
    //e.g. Meals.find({ mealCategory: 'breakfast' })
    // returns an object { meals }
    const meals = await Meals.find(queryAllMealsInCategory()).sort({
      uploadDate: 'desc',
    });
    // console.log({meals});
    // Render category page and pass on data from db query
    res.render('./categoryPage.ejs', { meals });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
