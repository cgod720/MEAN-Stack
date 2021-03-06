const express = require('express');
const router = express.Router();

const Places = require('../models/places.js');


//create route
router.post('/', (req, res) => {
  console.log(req.body);
  Places.create(req.body, (err, createdPlace) => {
    res.json(createdPlace);
  });
});
//get route
router.get('/', (req, res) => {
  Places.find({createdBy: req.session.currentUser._id}, (err, foundPlace) => {
    res.json(foundPlace);

  });
});

//update route
router.put('/:id', (req, res) => {
  Places.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlace) => {
    res.json(updatedPlace);
  });
});
router.delete('/:id', (req, res) => {
  Places.findByIdAndRemove(req.params.id, (err, deletedPlace) => {
    res.json(deletedPlace);
  });
});

module.exports = router;
