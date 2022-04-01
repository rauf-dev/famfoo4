const express = require('express');

const router = express.Router();

const Meal = require('../../models/mealSchema');

router.get('/:id', async (req, res) => {
  console.log('IN EDIT MEAL ROUTE');

  const meal = await Meal.findById(req.params.id);
  
  res.render('editMealPage', {meal});
});

module.exports = router;
