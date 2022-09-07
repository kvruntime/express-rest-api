class Cours {
  static currentId = 0;

  constructor(name) {
    this.name = name;
    this.id = Cours.currentId;
  }
}

class CoursService {

  constructor() {
    this.courses = [];
    CoursService.createCourses(this.courses, "physics", "dev", "sever", "sql");
  }

  addNewLesson(cours) {
    this.courses.push(cours);
  }
  findCourse(id) {
    return this.courses.find((c) => c.id == id);
  }

  findCourseIndex(course) {
    return this.courses.indexOf(course);
  }

  findAllCourses() {
    return this.courses;
  }

  deleteLesson(course) {
    let index = this.findCourseIndex(course);
    this.courses.splice(index, 1);
  }

  createNewCourse(name) {
    return new Cours(name);
  }

  updateCourse(id, course){
    const fcourse = this.findCourse(id)
    // this.courses
  }

  static createCourses(courses, ...names) {
    names.forEach((c) => {
      courses.push(new Cours(c));
      Cours.currentId++;
    });
    return courses;
  }
}

module.exports.Cours = Cours;
module.exports.CoursService = CoursService;
