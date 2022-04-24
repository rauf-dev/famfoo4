// !!NOT IN USE
const Meal = require('../models/mealSchema');

async function saveMealToMongoDb (meal){
    console.log('save meal to db function');
    const savedMeal = await meal.save();
    console.log('savedMeal is:');
    console.log(savedMeal);
    return savedMeal;
}

module.exports = saveMealToMongoDb;