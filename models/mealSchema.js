const mongoose = require('mongoose');

// Schema for entry of meal in db
const MealSchema = mongoose.Schema({
    mealCategory: {
      type: String,
      required: true,
      lowercase: true,
    },
    mealName: {
      type: String,
      required: true,
      lowercase: true,
    },
    mealDescription: {
      type: String,
      required: false,
      lowercase: true,
    },
    imageName: {
      type: String,
    },
    imageLocation: {
      type: String,
    },
    imageThumbnail: {
      type: String,
    },
  
    imagekitImageId: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  });

  // INFO: Collection name will be pluralized by mongo (for downward compactibility?)
// INFO: So it will be renamed from col-famfoo4 to col-famfoo4s
  module.exports = mongoose.model('famfoomeals',MealSchema);