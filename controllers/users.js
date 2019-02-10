const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  // check if a user with the provided username already exists
  User.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
    // if user does exist
    if (foundUser) {
      // Send error message back to client
      res.status(409).json({
        status: 409,
        message: "Provided username is already in use"
      })
    } else {
      // there is no user with the provided username

      // convert username to lower case
      req.body.username = req.body.username.toLowerCase();
      
      // encrypt password provided in sign up form
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

      // create new user
      User.create(req.body, (err, createdUser) => {
        // send created user back to client
        res.status(201).json(createdUser);
      });
    }
  })
});

module.exports = router;
›
