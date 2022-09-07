class Cours {
  static currentId = 0;

  constructor(name) {
    this.name = name;
    this.id = Cours.currentId;
  }

}


class CoursService{

  constructor(){}

  static createNewCourse(name){
  return new Cours(name)
}

  static createCourses(...names) {
    const courses = [];
    names.forEach((c) => {
      courses.push(new Cours(c));
      Cours.currentId++;
    });
    return courses;
  }
}


module.exports.Cours = Cours
module.exports.CoursService = CoursService