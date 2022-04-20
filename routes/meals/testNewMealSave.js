// ...rest of the initial code omitted for simplicity.
// const { body, validationResult } = require('express-validator');

// app.post(
//   '/',
//   // username must be an email
//   body('mealName').notEmpty(),
//   body('mealCategory').notEmpty(),
//   body('multerFileNameInput').notEmpty(),
//   async (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     User.create({
//       username: req.body.username,
//       password: req.body.password,
//     }).then(user => res.json(user));
//   },
// );

// POSThttp://localhost:3005/meals/new/savemeal
// [HTTP/1.1 400 Bad Request 194ms]

1

{
    "errors":[
        {
            "msg":"Invalid value",
            "param":"multerFileNameInput",
            "location":"body"}
    ]
}

