class Cours {
  static currentId = 0;

  constructor(name) {
    this.name = name;
    this.id = Cours.currentId;
  }
}

class CoursService {
  static lessons = [];

  constructor() {}

  static findCourseById(id){
    return CoursService.lessons.find(c=>c.id==id)
  }

  static findCourseIndex(course){
    return CoursService.lessons.indexOf(course);
  }

  static getAllLessons() {
    return CoursService.lessons;
  }

  static deleteLesson(course){
    let index = CoursService.findCourseIndex(course)
    CoursService.lessons.splice(index, 1);
  }

  static createNewCourse(name) {
    return new Cours(name);
  }

  static createCourses(...names) {
    names.forEach((c) => {
      CoursService.lessons.push(new Cours(c));
      Cours.currentId++;
    });
    return CoursService.lessons;
  }
}

module.exports.Cours = Cours;
module.exports.CoursService = CoursService;
