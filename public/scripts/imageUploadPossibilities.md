# Image upload for new meal

In the context of saving a new meal, this document describes the image upload process, it's requirements and reasons for solution implemented.

# 1. Process

```mermaid
sequenceDiagram
    participant AddMealPage Form Fields
    participant ImageKitLibrary
    participant MongoDB
    AddMealPage Form Fields->>ImageKitLibrary: Upload image
    activate ImageKitLibrary
    ImageKitLibrary->>AddMealPage Form Fields: Return results which populate image preview
    activate AddMealPage Form Fields
    ImageKitLibrary->>AddMealPage Form Fields: Return results which populate hidden form fields
    deactivate ImageKitLibrary
    AddMealPage Form Fields->>MongoDB: Submit button: Saves all fields to Db
    deactivate AddMealPage Form Fields
```



Each Meal is stored as document in MongoDB. Meal image is not stored in MongoDB. Only reference of image (ImageKit-ImageID, locationURL, etc) saved to corresponding meal document in  MongoDB.

This means the image must be saved and an ImageKit-ImageID returned to client so that when client saves the meal data (a form) to MongoDB, the respective image data is available.

# 2. Requirements:

- Saving a new meal, user enters meal name, description, category and image. Meal data is stored in MongoDB.
- The meals' image is saved to imageKit.io ligrary. The MongoDB meal document contains reference to the image location. Image is not stored in MongoDB.
- Client side image upload in order to reduce load, traffic and complexity on the server.
- User can select existing image on device or capture a new image using device camera.
- A preview of the selected / captured image is optionaldesired but optional at this stage.

# 3. Posibilities Available
1. Use ImageKit client side upload API, Javascript.
2. Use a upload widget
   1. Uppy - A sleek, modular JavaScript file uploader that integrates seamlessly with any application. It allows users to pick files from local devices, webcam or Drive, Facebook, Instagram, and Dropbox.Uppy - A sleek, modular JavaScript file uploader that integrates seamlessly with any application. It allows users to pick files from local devices, webcam or Drive, Facebook, Instagram, and Dropbox.
   2. Dropzone.js - An open-source JS library that provides drag and drop file uploads with image previews. It’s lightweight, doesn’t depend on any other library (like jQuery), and is highly customizable.

## Comparison

|Feature|1 ImageKit API| 2.1 Uppy JS Framework| 2.2 Dropzone JS Framework|
|-------|:----------:|:-----------------:|:------------------:|
|Preview added image|no, custom css/js needed|yes|yes|
|Source: Camera|device browser whim. Had issues iPhone vs android|yes|yes|
|Source: Local device|yes|yes|yes|
|Source: gdrive, dropbox, facebook, Instagram|no|yes|?|
|Beginner friendliness|Very good. Official documentation|Very good. Official ImageKit-Uppy API and documentation|Not good. Focused on drag-n-drop|

# 4 Solution
Work in progress...
Implementing image upload using Uppy JS using the official ImageKit-Uppy API