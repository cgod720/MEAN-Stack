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


router.get('/currentUser', (req, res) => {
  // if there is a currentUser,
  // send the currentUser to the client
  // if there is no currentUser, send false
  res.status(200).json(req.session.currentUser || false);
})


router.delete('/', (req, res) => {
  // destroy current session
  req.session.destroy(err =>{
		if(err){
      // send an error message back to client
			res.status(500).json({
        status: 500,
        message: 'Unexpected error occured'
      });
		} else {
      // send success message back to client
      res.status(200).json({
        status: 200,
        message: 'User is now logged out'
      });
		}
	});
})

module.exports = router;
