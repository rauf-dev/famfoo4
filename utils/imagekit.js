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

module.exports = {
  imagekit,
  imageUrlShowcase,
};
