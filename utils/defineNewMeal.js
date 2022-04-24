const Meal = require('../models/mealSchema');

async function defineNewMeal (reqbody){
    // COMMENT: define the new meal
    console.log('define new meal function.');
    const meal = new Meal({
        mealCategory: reqbody.mealCategory,
        mealName: reqbody.mealName,
        mealDescription: reqbody.mealDesription,
        imageName: reqbody.imageName,
        imageLocation: reqbody.imageLocation,
        imageThumbnail: reqbody.imageThumbnail,
        imagekitImageId: reqbody.imagekitImageId,
      });

      return meal;
}

module.exports = defineNewMeal;