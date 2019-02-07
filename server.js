//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//Middleware
app.use(express.json());
app.use(express.static('public'));




app.listen(3000, () => {
  console.log('Ready..');
})

mongoose.connect('mongodb://localhost:27017/ideas', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log("Mongo Connected");
})
