const ImageKit = require('imagekit');
require('dotenv').config();

// VARIABLES FOR .ENV FILE
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_MEALS_URL_ENDPOINT;

// INIT IMAGEKIT
const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// IMAGEKIT GENERATE URLs
const imageUrlShowcase = imagekit.url({
  path: '/assets/undraw_breakfast_psiw_2-GdFgqGp1.svg',
  urlEndpoint: urlEndpoint,
  transformation: [
    {
      height: '320',
      width: '400',
    },
  ],
});

const imageURL = imagekit.url({
  src: 'https://ik.imagekit.io/your_imagekit_id/endpoint/default-image.jpg',
  transformation: [
    {
      height: '300',
      width: '400',
    },
  ],
});

// Auth for client side upload
const authParameters = imagekit.getAuthenticationParameters();
console.log(authParameters);

// Removes tag "temp", adds new tag with db-id
// to confirm image data saved to db


function updateImagekitTag(file_Id, tag) {
  // args tag = `db-` + mealId;
  // args file_id = savedMeal.imagekitImageId;
  
  console.log('Update image tags');
  imagekit.updateFileDetails(
    file_Id,
    {
      tags: [tag],
    },
    function (error, result) {
      if (error) console.log(error);
      else {
        console.log(result);
        return result;
      }
    }
  );
}

// Cleanup everytime new meal page is loaded
// Finds images with tag "temp" and deletes them
function findImgTempTagAndDelete() {
  console.log('in findImgTempTagAndDelete function: result...');
  imagekit.listFiles(
    {
      tags: ['temp'],
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
  // tbd: Delete images found
}

module.exports = {
  imagekit,
  imageUrlShowcase,
  authParameters,
  updateImagekitTag,
  findImgTempTagAndDelete,
};
