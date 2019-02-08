//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

//Middleware
app.use(session({
  secret: "MEANSTACKRULES",
  resave: false,
  saveUninitialized: false
}))


app.use(express.json());
app.use(express.static('public'));

const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.listen(3000, () => {
  console.log('Ready..');
})

mongoose.connect('mongodb://localhost:27017/ideas', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log("Mongo Connected");
})
