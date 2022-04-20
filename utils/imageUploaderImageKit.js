const ImageKit = require('./imagekit');

function uploadToImageKit (file, imageToBeUploaded){
  console.log('###########################')
  console.log('in function to upload image to imagekit')
    const result = ImageKit.imagekit.upload({
        file: file, // required
        fileName: imageToBeUploaded, // required
      });
      console.log(result);
      return result;
}

function deleteImageInImageKit (imagekitImageId){
  const deletedResults = ImageKit.imagekit.deleteFile(imagekitImageId);
  return deletedResults;
}

module.exports = {
  uploadToImageKit,
  deleteImageInImageKit
};