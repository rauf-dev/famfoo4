// We have a form with:
// 1) File input 
// 2) Form inputs
// 3) Submit button

// File input: 
// File input fills in form field: - imageName: '..._cz.jpeg
// eventListener('change') fires off a fetch request 
// - that uploads image to imageKit
// - returns results
// - results used to prepopulate hidden form fields
//          -imageLocation: 'https://ik.imagekit.io/ptr...cz.jpeg',
//          -imageThumbnail: 'https://ik.imagekit.io/ptr...cz.jpeg',
//          -imagekitImageId: '61f405fa5523f13bf042b87a',






// meal: {
//     _id: new ObjectId("61f405fa928873adc1b8477b"),
//     mealCategory: 'mains',
//     mealName: 'jump!',
//     mealDescription: '',
//     imageName: '1643382243752--7D3FC9D9-22B1-4656-8CD1-F64212470B8C_5-ncMP_cz.jpeg',
//     imageLocation: 'https://ik.imagekit.io/ptrqyxh4ajrm/1643382243752--7D3FC9D9-22B1-4656-8CD1-F64212470B8C_5-ncMP_cz.jpeg',
//     imageThumbnail: 'https://ik.imagekit.io/ptrqyxh4ajrm/tr:n-media_library_thumbnail/1643382243752--7D3FC9D9-22B1-4656-8CD1-F64212470B8C_5-ncMP_cz.jpeg',
//     imagekitImageId: '61f405fa5523f13bf042b87a',
//     uploadDate: 2022-01-28T15:04:26.372Z,
//     __v: 0
//   }