const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        res.status(201).json(foundUser)
      } else {
          res.send(401).json({
            status: 401,
            message: 'invalid'
          })
      }
  })
})

module.exports = router;
