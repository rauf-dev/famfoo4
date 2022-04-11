const ImageKit = require('./imagekit');

function uploadToImageKit (file, imageToBeUploaded){
    const result = ImageKit.imagekit.upload({
        file: file, // required
        fileName: imageToBeUploaded, // required
      });
      console.log(result);
      return result;
}

module.exports = uploadToImageKit;