const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
});

const Course = mongoose.model('Course', courseSchema);

// module.exports.courseSchema=courseSchema
module.exports.Course = Course;
