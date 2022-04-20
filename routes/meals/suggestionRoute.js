const express = require('express');

const router = express.Router();

const Meals = require('../../models/mealSchema');

router.get('/', async (req, res) => {
  try {
    const getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };
    console.log('route SUGGESTION');

    // query mongoDB
    const meals = await Meals.find();

    // get a random number
    const randomIndex = getRandomInt(0, meals.length);

    console.log(`meals total in db is ${meals.length}`);
    console.log(`max is ${meals.length}`);
    console.log(randomIndex);
    console.log(req.originalUrl);

    // get random meal
    const randomMeal = meals[randomIndex];

    res.render('./suggestionPage', { randomMeal });

  } catch (err) {
    res.json({ message: err });
  }
  // res.send('Welcome to MAINS page');
});

module.exports = router;
