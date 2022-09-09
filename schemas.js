const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
  },
});

module.exports.Genre = new mongoose.model('Genre', genreSchema);
module.exports.Customer = new mongoose.model('Customer', customerSchema);
