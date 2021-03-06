const express = require('express');
const path = require('path'); //setup path to public folder
const morgan = require('morgan'); //route logging
const mongoose = require('mongoose'); //mongoDB
const session = require('express-session'); //Messaging: stores session
const flash = require('connect-flash'); //Messaging: stores the messages
const messages = require('express-messages'); //Messaging: shows the messages
const { imagekit, authParameters } = require('./utils/imagekit');
// const fs = require('fs');

require('dotenv/config'); //read dotenv file

//importing routes modules
const home = require('./routes/homeRoute');
const newMealPage = require('./routes/meals/newMealPageRoute');
const suggestionPage = require('./routes/meals/suggestionRoute');
const categoryPage = require('./routes/meals/categoryRoute');
const mealDetailsPage = require('./routes/meals/mealDetailsRoute');
const editMeal = require('./routes/meals/editMealRoute');
const newMealSaveMealRoute = require('./routes/meals/newMealSaveMealRoute');
const deleteMealRoute = require('./routes/meals/deleteMealRoute');

// INIT APP
const app = express();
const PORT = process.env.PORT || 3005;

//MIDDLEWARE
app.use(express.json()); // to support JSON-encoded bodies

// SET EJS AND VIEWS FOLDER
app.set('view engine', 'ejs');
app.set('views', 'public/views');

//Set public folder
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('tiny')); // Logging in dev env

//Messaging middleware; 
//Express-Session: Stores user session for use between the req and res
//Connect Flash: Used to display the message set in express-messages below
//Express-Messages: Sets a global variable "messages", which I can pre-define
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// ROUTES
app.get('/auth', (req, res)=>{
  const authParameters = imagekit.getAuthenticationParameters();
  res.send(authParameters);
});


app.use('/', home);
app.use('/meals/newMealPage', newMealPage);
app.use('/meals/suggestion', suggestionPage);
app.use('/meals/category', categoryPage);
app.use('/meals/meal', mealDetailsPage);
app.use('/meals/edit', editMeal);
app.use('/meals/new/savemeal', newMealSaveMealRoute);
app.use('/meals/delete', deleteMealRoute);
app.use('/suggestion', suggestionPage);

//Connect to mongoDB
try {
  mongoose.connect(process.env.DB_CONNECTION);
} catch (error) {
  console.log(error);
}

// Start app
app.listen(PORT, () => console.log(`FAMFOO4 Server started on port ${PORT}`));
