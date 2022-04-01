const express = require('express');

const Meal = require('../../models/mealSchema');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        console.log('In GET meal by ID route');
        
        // query mongoDB
        console.log(req.params);
        const meal = await Meal.findById(req.params.id);
        console.log({ meal });
        res.render('./mealDetailsPage', { meal });
      } catch (err) {
        res.json({ message: err });
      }
});

module.exports = router;