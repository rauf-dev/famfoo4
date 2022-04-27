const imageName = document.getElementById('imageName');
const imageLocation = document.getElementById('imageLocation');
const imageThumbnail = document.getElementById('imageThumbnail');
const imagekitImageId = document.getElementById('imagekitImageId');

const fileField = document.querySelector('input[type="file"]');
fileField.addEventListener('change', upload);

const imagekit = new ImageKit({
  publicKey: 'public_sByx+wwcY0EsO9JcZ/zGoCx3vts=',
  urlEndpoint: 'https://ik.imagekit.io/ptrqyxh4ajrm',
  // authenticationEndpoint: "http://localhost:3005/auth"
  authenticationEndpoint: 'https://mealorg.herokuapp.com/auth',
});

function upload(e) {
  console.log('Frontend upload to imagekit');
  e.preventDefault();
  const file = document.getElementById('image_uploads');
  imagekit.upload(
    {
      file: file.files[0],
      fileName: file.files[0].name || 'sample-file.jpg',
      tags: ['temp'], // Comma seperated value of tags
      responseFields: 'tags', // Comma seperated values of fields you want in response e.g. tags, isPrivateFile etc
    },
    function (err, result) {
      if (err) {
        console.alert('Error in file upload. Error response below');
        console.log(err);
      } else {
        console.log('File uploaded. Success response below');
        console.log(result);
        imageName.value = result.name;
        imageLocation.value = result.url;
        imageThumbnail.value = result.thumbnailUrl;
        imagekitImageId.value = result.fileId;
      }
    }
  );
}
