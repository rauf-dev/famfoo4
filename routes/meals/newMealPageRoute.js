const express = require('express');
const fs = require('fs');
const deleteAllImagesMulterFolder = require('../../utils/imageDeleterMulter');
const router = express.Router();






router.get('/', (req, res) => {
  try {
    console.log('########### ADD NEW MEAL ROUTE ##################')
    console.log('Deletes images in multer folder');
    deleteAllImagesMulterFolder();
  } catch (error) {
    console.log(error);
  }

  res.render('addNewMeal.ejs', {
    result: {
      fileId: 'none',
    },
  });

});
// router.get('/', (req, res) => {
//     res.render('addNewMeal.ejs', {
//       result: {
//         fileId: 'none',
//       },
//     });
//   });

module.exports = router;
