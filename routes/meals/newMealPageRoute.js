const express = require('express');
const fs = require('fs');
const deleteAllImagesMulterFolder = require('../../utils/imageDeleterMulter');
const { findImgTempTagAndDelete } = require('../../utils/imagekit');
const router = express.Router();






router.get('/', (req, res) => {
  try {
    console.log('########### ADD NEW MEAL ROUTE ##################')
    console.log('Deletes images in multer folder');
    deleteAllImagesMulterFolder();
    findImgTempTagAndDelete();
  } catch (error) {
    console.log(error);
  }

  res.render('addNewMeal.ejs', {
    result: {
      fileId: 'none',
    },
  });

});

module.exports = router;
