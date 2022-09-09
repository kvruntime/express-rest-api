const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // isAsync: true,
      validator: function (v) {
        // setTimeout(() => {
        //   // Doing some async tasks here
        //   const result = v && v.length > 0
        //   callback(result);
        // }, 5000);
        return v && v.length > 0;
      },
      message: 'A course must have at least one tag!!',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  price: {
    type: Number,
    required: function () {
      return this.isPublished; // not allowed arrow function here
    },
    min:1,
    max:100
    // get:v =>Math.round(v)
    // set:v =>Math.round(v)
  },
});

module.exports.Course = mongoose.model('Course', courseSchema);
