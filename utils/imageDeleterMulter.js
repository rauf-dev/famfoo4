// Multer local storage is used only as temp storage until image is saved to ImageKit and its corresponding data saved to mongo db.
// This function deletes any files found in the multer local storage folder (public/images)
// This function is called:
//      --> anytime the AddNewMealPage is loaded (including reset form button)
//      --> 

const fs = require('fs');

// If images are found in multer local storage folder (public/images), will be deleted 
// everytime AddNewMealPageRoute is called.
function deleteAllImagesMulterFolder () {

    console.log('--> checking for images in multer local storage (public/images) folder')
    let files = fs.readdirSync("./public/images")
    if (files.length > 0){
      console.log('--> files found in images folder, start deleting')
      files.forEach( file =>{
        console.log(`--> deleting ${file}`);
        let fileToDelete = "./public/images/"+file
        fs.unlink(fileToDelete, (err => {
          if (err) {
            console.log("error deleting file in multer local storage folder, fs.unlink")
            console.log("./public/images/"+file)
            console.log(err);
          }
        }));
      });
    }
    console.log('no files in images folder, continuing loading')
    }



module.exports = deleteAllImagesMulterFolder;

