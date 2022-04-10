const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({
    // IF LEAVE BELOW EMPTY IT WILL USE OS DEFAULT TEMP DIR
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  }),
});