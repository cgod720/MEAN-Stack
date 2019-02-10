const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  // Find user with provided username
  User.findOne({username: req.body.username}, (err, foundUser) => {
    // If there is no user with that username
    if (!foundUser){
      // Send error to client
      res.status(409).json({
        status: 409,
        message: 'Username does not exist'
      })
    } else if(bcrypt.compareSync(req.body.password, foundUser.password)){
      // provided password matches user password
      // save found user as currentUser
      req.session.currentUser = foundUser;

      // Send user object back to client
      res.status(201).json(foundUser)
    } else {
      // Send error to client
      res.status(401).json({
        status: 401,
        message: 'Incorrect password'
      })
    }
  })
})

module.exports = router;
