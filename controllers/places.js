const express = require('express');
const router = express.Router();

const Places = require('../models/places.js');


//create route
router.post('/', (req, res) => {
  Places.create(req.body, (err, createdPlace) => {
    res.json(createdPlace);
    // res.send('post route working');
  });
});
//get route
router.get('/', (req, res) => {
  Places.find({}, (err, foundPlace) => {
    res.json(foundPlace);
    // res.send('get route working');
  });
});
//update route
router.put('/:id', (req, res) => {
  Places.findByIdAndUpdate(req.params.id, req.body, (err, updatedPlace) => {
    res.json(updatedPlace);
  });
});
router.delete('/:id', (req, res) => {
  Places.findByIdAndRemove(req.params.id, (err, deletedPlace) => {
    res.json(deletedPlace);
  });
});

module.exports = router;
