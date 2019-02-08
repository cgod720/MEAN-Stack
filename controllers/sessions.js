const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
      if (!foundUser){
        res.status(401).json({
          status: 401,
          message: 'invalid'
        })
      } else if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        res.status(201).json(foundUser)
      }
  })
})

module.exports = router;
