const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('addNewMeal.ejs', {
      result: {
        fileId: 'none',
      },
    });
  });

module.exports = router;