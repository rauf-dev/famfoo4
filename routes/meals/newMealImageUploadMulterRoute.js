// Uploads a file (image) to multer local storage (/public/images)
// trigger: event listener in AddNewMealForm --> file input change --> fetch API POST

const { json } = require('express');
const express = require('express');
const router = express.Router();

const fs = require('fs'); // using multer to save image local server disk
const uploadMulter = require('../../utils/multer');

// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//START FETCH POST TO UPLOAD IMAGE TO MULTER
router.post('/image', uploadMulter.single('image'), async (req, res) => {
  if (!req.file) throw new Error('No image was selected');
  try {
    console.log('###### EVENT LISTENER, UPLOAD IMAGE TO MULTER LOCAL STORAGE ##########')
    console.log(JSON.stringify(req.file));
    const multerFileName = req.file.filename;
    const multerFilePath = req.file.path;

    // returns data to populate hidden form fields in AddNewMealForm
    res.json({ multerFileName, multerFilePath });
  } catch (error) {
    console.log('Error in image upload to multer local storage');
    console.log(error);
  }
});

module.exports = router;