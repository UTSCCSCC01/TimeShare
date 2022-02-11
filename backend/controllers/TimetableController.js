var mongoose = require("mongoose");
require("../models/Timetable");
require("../models/Course");
require('../models/Tutorial');
require('../models/Lecture');

var Timetable = mongoose.model("Timetable");
var Course = mongoose.model("Course");
var Lecture = mongoose.model("Lecture");
var Tutorial = mongoose.model('Tutorial');

exports.create_timetable = async function (req, res) {

  // Get the name and id from the post request
  var name = req.body.name;
  var id = req.body.id;

  // Create an empty timtable
  let existingTable = await Timetable.findOne({ timetable_id: id });

 
  if (existingTable) {
    return res.status(400).send("That timetable already exists");
  }

  var newTimetable = new Timetable({
    timetable_name: name,
    courses: [],
    lectures: [],
    tutorials: [],
    timetable_id: id,
  });
  

  // save to database
  newTimetable.save(function (err) {
    if (err) {
      return new Error(`Error while saving to DB`);
    }
  });

 
  res.status(200).send(name);
};



exports.add_course = async function (req, res) {
  
  // name of course to add
  var course_id = req.body.course_id;
  var timetable_id = req.body.timetable_id;
  var lecture_id = req.body.lecture_id;
  var tutorial_id = req.body.tutorial_id;


  // find this course in course database

  let existingCourse = await Course.findOne({ course_id: course_id });
  let existingLecture = await Lecture.findOne({ course_id: course_id, lecture_id: lecture_id });
  let existingTutorial = await Tutorial.findOne({ course_id: course_id, tutorial_id: tutorial_id })

  if (existingCourse && existingLecture && existingTutorial) { // we only want to add the course if we find the lecture as well
    // logic for adding course to our user's courses

    let timetable_we_want = await Timetable.findOne({
      timetable_id: timetable_id,
    });

    if (!timetable_we_want) {
        return res.status(404).send("Timetable doesn't exist");
    }
   
    let courses = timetable_we_want.courses;
    for(let i = 0; i < courses.length; i++) {
        let course = await Course.findOne({ "_id": courses[i]})
        if (course.course_id == existingCourse.course_id) {
            return res.status(404).send("Course already exists in Timetable");
        }
    }

    timetable_we_want.courses.push(existingCourse);
    timetable_we_want.lectures.push(existingLecture);
    timetable_we_want.tutorials.push(existingTutorial);
    
    timetable_we_want.save(function (err) {
      if (err) {
        return new Error(`Error while saving to DB`);
      }
    });
    timetable_we_want.populate("courses");
    timetable_we_want.populate("lectures");
    timetable_we_want.populate("tutorials");
    res.status(200).send(timetable_we_want);
  } else if (!existingCourse) {
    // logic for when the course doesn't exist
    return res.status(404).send("Course doesn't exist");
  } else if (!existingLecture){
    // logic for when the lecture doesn't exist
    return res.status(404).send("Lecture doesn't exist");
  } else if (!existingTutorial){
    return res.status(404).send("Tutorial doesn't exist");
  }
};

exports.remove_course = async function (req, res) {
  // name of course to add
  var course_id = req.body.course_id;
  var timetable_id = req.body.timetable_id;
  // find this course in course database

  let existingCourse = await Course.findOne({ course_id: course_id });
  
  
  if (existingCourse) {
    // logic for deleting course to our user's courses

    
    let timetable_we_want = await Timetable.findOne({timetable_id: timetable_id});


    // If we found the timetable
    if (timetable_we_want) {

      const course_index = timetable_we_want.courses.indexOf(existingCourse._id); // error check here


      let course = await Course.findOne({ course_id: existingCourse.course_id });
      // Lecture deletion
      for (let i = 0; i < timetable_we_want.lectures.length; i++) {
        let lecture = await Lecture.findOne({ _id: timetable_we_want.lectures[i] });
        
        if (course.course_id == lecture.course_id) {
          timetable_we_want.lectures.splice(i, 1);
          break;
        }
      }

      // Tutorial deletion
      for (let i = 0; i < timetable_we_want.tutorials.length; i++) {
        let tutorial = await Tutorial.findOne({ _id: timetable_we_want.tutorials[i] });

        if (course.course_id == tutorial.course_id) {
          timetable_we_want.tutorials.splice(i, 1);
          break;
        }
      }
      if (course_index >= 0) {
        timetable_we_want.courses.splice(course_index, 1);

        timetable_we_want.save(function (err) {
          if (err) {
            return new Error(`Error while saving to DB`);
          }
        });
      }

      timetable_we_want.populate("courses");
      res.status(200).send(timetable_we_want);
    } else {
      // timetable not found
      return res.status(404).send("Timetable doesn't exist");
    }

    // if it doesnt find the timetable --> error

    // if the course isn't in the timetable --> error or fail silently
  } else {
    // logic for when the course doesn't exist
    
    return res.status(404).send("Course doesn't exist");
  }
};

exports.get_courses = async function (req, res) {
  var id = req.body.id;

  let timetable_we_want = await Timetable.findOne({ timetable_id: id }); // error check later
  let courses_to_return = [];
  if (timetable_we_want) {
    var course_ids = timetable_we_want.courses;
    let result = "Timetable courses:<br/>";
    
    for (let i = 0; i < course_ids.length; i++) {

      let course = await Course.findOne({ _id: course_ids[i] });
      result = result.concat(course.course_id, ": ", course.course_name, "<br/>");
    }

    return res.status(200).send(result);
  } else {
    // timetable not found
    return res.status(404).send("Timetable doesn't exist");
  }
};

