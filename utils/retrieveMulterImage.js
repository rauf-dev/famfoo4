const fs = require('fs');


function retrieveMulterImage (imageToRetrieve){
    console.log('###########################')
    console.log('in function to retrieve multer image')
    const imagesPath = process.cwd() + '/public/images';
    console.log(imagesPath);
    const file = fs.createReadStream(imagesPath + '/' + imageToRetrieve);
    return file;
}

module.exports = retrieveMulterImage;