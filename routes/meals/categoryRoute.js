const express = require('express');
const router = express.Router();
const Meals = require('../../models/mealSchema');

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

// give variables needed for pagination in frontend
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const selectedCategory = req.originalUrl.slice(req.originalUrl.lastIndexOf('/'),req.originalUrl.indexOf('?')).replace('/',"");
    console.log(selectedCategory);
    console.log(typeof(selectedCategory));


    const results = {}
    
    if (endIndex < await model.countDocuments({'mealCategory': selectedCategory}).exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find({'mealCategory': selectedCategory}).sort({
        uploadDate: 'desc'}).limit(limit).skip(startIndex).exec();
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = router;
