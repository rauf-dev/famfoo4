const express = require('express');

const Meal = require('../../models/mealSchema');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        console.log('In GET meal by ID route. req.params below');
        
        // query mongoDB
        console.log(req.params);
        const meal = await Meal.findById(req.params.id);
        res.render('./mealDetailsPage', { meal });
      } catch (err) {
        res.json({ message: err });
      }
});

module.exports = router;