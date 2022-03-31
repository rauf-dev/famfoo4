const express = require("express");

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('suggestionPage.ejs');
});

module.exports = router;