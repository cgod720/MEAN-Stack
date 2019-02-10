//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

//Port
const PORT = process.env.PORT || 3000;

//Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/routr';

//Middleware
app.use(session({
  secret: "MEANSTACKRULES",
  resave: false,
  saveUninitialized: false
}))


app.use(express.json());
app.use(express.static('public'));

// const userController = require('./controllers/users.js');
// app.use('/users', userController);
//
// const sessionsController = require('./controllers/sessions.js');
// app.use('/sessions', sessionsController);
//
// const placesController = require('./controllers/places.js');
// app.use('/places', placesController);

app.listen(PORT, () => {
  console.log('Ready..');
})

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log("Mongo Connected");
})
