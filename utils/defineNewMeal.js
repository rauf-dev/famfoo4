const Meal = require('../models/mealSchema');

function defineNewMeal (result, reqbody){
    // COMMENT: define the new meal
    const meal = new Meal({
        mealCategory: reqbody.mealCategory,
        mealName: reqbody.mealName,
        mealDescription: reqbody.mealDescription,
        imageName: result.name,
        imageLocation: result.url,
        imageThumbnail: result.thumbnailUrl,
        imagekitImageId: result.fileId,
      });
      return meal;
}

module.exports = defineNewMeal;