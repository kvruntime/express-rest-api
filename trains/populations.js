/* 
RELATIONSHIPS

learning how to put relationships in document nosql database (mongodb)

  using REFRENCES-method
*/

require('dotenv').config();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.TEST_DB_URL)
  .then(() => console.log('connected to DB...'));

const Author = new mongoose.model(
  'Author',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  }),
);

const Course = new mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  }),
);

async function createAuthor(name, bio, website) {
  return await new Author({
    name: name,
    bio: bio,
    website: website,
  }).save();
}

async function createCourse(name, author) {
  return await new Course({
    name: name,
    author: author,
  }).save();
}

async function listCourses() {
  const cs = await Course.find()
    // .select({name:1})
    .populate('author', 'name -_id')
    .sort({ name: 1 });

  console.log(cs);
}

// createAuthor('Another', 'prof student', 'another.com');
// createCourse('Java', '631b2897dc7293f1ea7cf986');
listCourses();
