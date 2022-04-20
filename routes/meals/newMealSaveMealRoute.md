# Validation for new meal form

## Frontend validation
- Meal name: using "required" tag.
- Meal category: using "required" tag.
- Image Upload: using accept="image/*".
- Meal description: none.

## Server side validation
- check('multerFilenameInput').notEmpty().isString().withMessage('Image is required'),
- check('multerFilePathInput').notEmpty().isString().withMessage('Server error. Must be string'),
- check('mealName').notEmpty().isString().withMessage('Meal Name is required'),
- check('mealCategory').notEmpty().isString().withMessage('Select a meal category'),
- check('mealDesription').notEmpty().isString().withMessage('Server error. Must be string'),


