const express = require('express');
const { findImgTempTagAndDelete } = require('../../utils/imagekit');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    console.log('########### ADD NEW MEAL ROUTE ##################')
    console.log('fix so cleanup imagekit temp tags works');
    // findImgTempTagAndDelete();
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
