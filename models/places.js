const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You can\'t see what you don\'t write'],  //just showing we can add a log message here for user, but prob not required
    unique: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  createdBy: {
    lat: Number,
    lng: Number
  }
});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;
