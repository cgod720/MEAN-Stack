const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new mongoose.Schema({
  name: String {require:true},
  location: {
    lat: Number,
    lng: Number
  }
});
