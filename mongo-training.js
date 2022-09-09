//#region Mongoose

// 1. define a schema
// 2. compile schema into model & store it into class Object
// 3. use the created class to instanciate new object
// 4. save object into database

require('dotenv').config();
const mongoose = require('mongoose');
const courseSchemas = require('./schemas/courseschemas');
mongoose.connect(process.env.DB_URL);

// const c = new courseSchemas.Course({
//   name: 'Angular Course',
//   author: 'Mosh Hamedani',
//   tags: ['node', 'backend', 'Angular'],
// });

// async function saveCourse(course) {
//   const result = await course.save();
//   console.log(result);
// }

// saveCourse(c);

async function getCourses() {
  const courses = await courseSchemas.Course
    // .find({ author: 'Mosh Hamedani' })
    .find({ author: /^Mosh/ })
    // .and([{author:"Mosh Hamedani"}, {tags: {$in:["node", "Angular"]}}])
    .skip()
    // .limit(2)
    .sort({ name: 1 });
  // .select({name:1, tags:1})
  // .count()

  console.log(courses);
}

async function updateCourse(id) {
  const course = await courseSchemas.Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Hakai',
        isPublished: false,
      },
    },
    { new: true },
  );
  console.log(course);
}

async function deleteCourse(id) {
const result = await courseSchemas.Course.findByIdAndRemove(id)
console.log(result)
}

// updateCourse('6319dedaf2c4fed1340de1c6');
// deleteCourse('6319dedaf2c4fed1340de1c6');
// getCourses();
//#endregion
