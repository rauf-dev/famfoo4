const express = require('express');
const path = require('path');//setup path to public folder
const morgan = require('morgan');//route logging
const mongoose = require('mongoose')//mongoDB

require('dotenv/config') //read dotenv file

//importing routes modules
const home = require('./routes/homeRoute');
const newMealPage = require('./routes/meals/newMealPageRoute');
const suggestionPage = require('./routes/meals/suggestionRoute');
const categoryPage = require('./routes/meals/categoryRoute');
const mealDetailsPage = require('./routes/meals/mealDetailsRoute');
const editMealPage = require('./routes/meals/editMealRoute');


// INIT APP
const app = express();
const PORT = process.env.PORT || 3005;

//MIDDLEWARE
app.use(express.json()); // to support JSON-encoded bodies

// SET EJS AND VIEWS FOLDER
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('tiny')); // Logging in env

// ROUTES
app.use('/', home);
app.use('/meals/newMealPage', newMealPage);
app.use('/meals/suggestion', suggestionPage);
app.use('/meals/category', categoryPage);
app.use('/meals/meal', mealDetailsPage);
app.use('/meals/edit', editMealPage);

//Connect to mongoDB
try {
    mongoose.connect(
        process.env.DB_CONNECTION
    );
} catch (error) {
    console.log(error)
}

// Start app
app.listen(PORT, () => console.log(`FAMFOO4 Server started on port ${PORT}`));
