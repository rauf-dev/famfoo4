const express = require('express');
const router = express.Router();
const Meals = require('../../models/mealSchema');
const paginatedResults = require('../../utils/pagination');

// /meals/category/x
router.get('/:var(mains|breakfast|snacks)', paginatedResults(Meals), async (req, res) => {
  let meals = {};
  meals = res.paginatedResults;

  // console.log(meals.next.page);
  if (meals.next){
  console.log(`Next: ${meals.next.page}`); //next page
  }
  if (meals.previous){ 
    console.log(`Previous: ${meals.previous.page}`);
  }
  const selectedCategory = req.originalUrl.slice(req.originalUrl.lastIndexOf('/'),req.originalUrl.indexOf('?')).replace('/',"");
  console.log(selectedCategory);
  console.log(typeof(selectedCategory));

  const totalMealsinCategory = await Meals.countDocuments({'mealCategory': selectedCategory}).exec();
  const limit = parseInt(req.query.limit)
  const page = parseInt(req.query.page)

  console.log(`Total Meals in Cat: ${totalMealsinCategory}`)

  res.render('./categoryPage.ejs', { meals, totalMealsinCategory, limit, page })
  // res.json(res.paginatedResults)
});



module.exports = router;
