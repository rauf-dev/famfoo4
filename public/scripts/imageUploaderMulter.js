// Hidden form elements that will be populated by results from function uploadMulter
const multerFilenameInput = document.getElementById('multerFilenameInput');
const multerFilePathInput = document.getElementById('multerFilePathInput');

// Start: Image upload to multer and show image preview
const fileField = document.querySelector('input[type="file"]')
fileField.addEventListener('change', uploadMulter)


function uploadMulter(image){
    image.preventDefault();
    let formData = new FormData()
    formData.append('image',fileField.files[0]);
    // formData.append('image',fileField.files[0]);

    fetch('/meals/new/imageMulter/image', {
        method: 'POST',
        body: formData,
        action: "/meals/new/imageMulter/image",
        enctype : "multipart/form-data"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // insert values to the new meal form
      multerFilenameInput.value = data.multerFileName
      multerFilePathInput.value = data.multerFilePath
    })
    .catch(error => {
      console.error('Error:', error)
    });
}
