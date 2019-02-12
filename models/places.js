const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true

  },
  location: {
    lat: Number,
    lng: Number
  },
  createdBy: String
});

const Places = mongoose.model('Place', placesSchema);

module.exports = Places;
