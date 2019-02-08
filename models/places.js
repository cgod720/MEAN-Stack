const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: Number,
    lng: Number
  }
});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;
