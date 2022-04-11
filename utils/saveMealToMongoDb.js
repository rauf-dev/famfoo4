// const Meal = require('../../models/mealSchema');

function saveMealToMongoDb (meal){
    const savedMeal = meal.save();
    console.log(savedMeal);
    return savedMeal;
}

module.exports = saveMealToMongoDb;