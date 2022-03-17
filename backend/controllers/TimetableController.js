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
    // courses: [],
    // lectures: [],
    // tutorials: [],
    timetable_id: id,
  });
  

  // save to database
  newTimetable.save(function (err) {
    if (err) {
      return new Error(`Error while saving to DB`);
    }
  });

 
  res.status(200).send(newTimetable);
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
        if (courses[i] == existingCourse.course_id) {
            return res.status(404).send("Course already exists in Timetable");
        }
    }

    timetable_we_want.courses.push(existingCourse.course_id);
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

      const course_index = timetable_we_want.courses.indexOf(course_id); // error check here

      // Lecture deletion
      for (let i = 0; i < timetable_we_want.lectures.length; i++) {
        let lecture = await Lecture.findOne({ _id: timetable_we_want.lectures[i] });
        
        if (course_id == lecture.course_id) {
          timetable_we_want.lectures.splice(i, 1);
          break;
        }
      }

      // Tutorial deletion
      for (let i = 0; i < timetable_we_want.tutorials.length; i++) {
        let tutorial = await Tutorial.findOne({ _id: timetable_we_want.tutorials[i] });

        if (course_id == tutorial.course_id) {
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

  if (timetable_we_want) {
    // var course_ids = timetable_we_want.courses;
    var lecture_ids = timetable_we_want.lectures;
    var tut_ids = timetable_we_want.tutorials;
    // let result = "Timetable courses:<br/>";
    let courses = [];
    
    // for (let i = 0; i < course_ids.length; i++) {

    //   let course = await Course.findOne({ _id: course_ids[i] });
    //   result = result.concat(course.course_id, ": ", course.course_name, "<br/>");

    //   let lecture = await Lecture.findOne({ _id: lecture_ids[i] })
    //   let tutorial = await Tutorial.findOne({ _id: tut_ids[i] })
    //   courses.push(lecture);
    //   courses.push(tutorial);
    //   // courses.push(course);
    // }

    for (let i = 0; i < lecture_ids.length; i++) {
      let lecture = await Lecture.findOne({ _id: lecture_ids[i] })
      courses.push(lecture);
    }

    for (let i = 0; i < tut_ids.length; i++) {
      let tutorial = await Tutorial.findOne({ _id: tut_ids[i] })
      courses.push(tutorial);
    }

    return res.status(200).send(courses);
  } else {
    // timetable not found
    return res.status(404).send("Timetable doesn't exist");
  }
};

exports.create_timetable2 = async function (req, res) {

  let owner = req.user._id;
  let timetable = req.body;


  let timetable_name = 'omeorgmeoprg'
  let timetable_id = '9392'
  let courses = []
  let lectures = []
  let tutorials = []

  Object.keys(timetable).forEach(key => {
    timetable[key].forEach(section => {
      if (section.type == 'lecture') {
        lectures.push(mongoose.Types.ObjectId(section.id))
        console.log('JGOIREJGOERIJGEORIGJER', section.id)
      }
      else {
        tutorials.push(mongoose.Types.ObjectId(section.id))
      }

      let tokens = section.name.split(" ")
      let course_id = tokens[0]
      courses.push(course_id)
    })
  })

  console.log(lectures)
  console.log(tutorials)
  console.log('hello!!!!!!!!!!')
  let newTimetable = new Timetable({
    owner: owner,
    timetable_name: timetable_name,
    timetable_id: timetable_id,
    courses: courses,
    lectures: lectures,
    tutorials: tutorials,
  });


  await newTimetable.save(function (err) {
    if (err) {
      return new Error(`Error while saving to DB`);
    }
  });

  console.log('og', newTimetable._id)


  const xd = await mapTimetableObjectToFrontend(newTimetable._id)
  console.log(xd)

  res.status(200).send(newTimetable);
};


const mapTimetableObjectToFrontend = async function (timetable_object_id) {
  console.log('LOLOELDE', timetable_object_id)
  let obj = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  }

  const bla = timetable_object_id.toString()
  console.log('diwdjoiwej', timetable_object_id.toString())
  const timetable_object = await Timetable.findOne({id: timetable_object_id.toString()})
  console.log(timetable_object)
  console.log(timetable_object._doc)

  for(const section of timetable_object['lectures']) {
    console.log('omega')
    console.log(section)
    console.log('lol')
    let lol = await Lecture.findOne({ _id: section })
    console.log(lol)
    let lecture_section = lol._doc;
    console.log(lecture_section)
    let name = lecture_section.course_id + " " + lecture_section.lecture_id
    console.log('HELLO!!!!!!!!!!!!')
    let day = lecture_section.time[0]
    let startTime = lecture_section.time[1]
    let endTime = lecture_section.time[2]
    console.log(day, startTime, endTime)
    section_obj = {
      id: section,
      name: name,
      type: 'lecture'
    }
    obj[lecture_section.time[0]].push(section_obj)

  }

  timetable_object['tutorials'].forEach(section => {
    let tutorial_section = Tutorial.findOne({ _id: section });
    let name = tutorial_section.course_id + " " + lecture_section.tutorial_id
    section_obj = {
      id: section,
      name: name,
      type: 'tutorial'
    }
    obj[lecture_section.time[0]].push(section_obj)

  })

  res.status(200).send(obj);
};

exports.mapTimetableObjectToFrontendz = async function (req, res) {

  const timetable_object_id = req.body.timetable_object_id

  let obj = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  }

  const timetable_object = await Timetable.findOne({'_id': timetable_object_id})
  
  for(const section of timetable_object['lectures']) {
    let lecture_section_obj = await Lecture.findOne({ _id: section })
    let lecture_section = lecture_section_obj._doc;
    let name = lecture_section.course_id + " " + "LEC" + lecture_section.lecture_id
    let day = lecture_section.time[0][0]
    let startTime = lecture_section.time[0][1] - 5
    let endTime = lecture_section.time[0][2] - 5
    let date1 = new Date("01-01-2022 " + startTime + ":00:00");
    let date2 = new Date("01-01-2022 " + endTime + ":00:00");

    section_obj = {
      id: section,
      name: name,
      type: 'lecture',
      day: day.toLowerCase(),
      startTime: date1,
      endTime: date2,
    }
    obj[lecture_section.time[0][0].toLowerCase()].push(section_obj)

  }

  // for(const section of timetable_object['tutorials']) {
  //   let tutorial_section_obj = await Tutorial.findOne({ _id: section });
  //   let tutorial_section = tutorial_section_obj._doc
  //   let name = tutorial_section.course_id + " " + "PRA" + tutorial_section.tutorial_id
  //   let day = tutorial_section.time[0]
  //   let startTime = tutorial_section.time[1]
  //   let endTime = tutorial_section.time[2]
  
  //   section_obj = {
  //     id: section,
  //     name: name,
  //     type: 'tutorial',
  //     day: day,
  //     startTime: startTime,
  //     endTime: endTime,
  //   }
  //   obj[tutorial_section.time[0][0].toLowerCase()].push(section_obj)

  // }
  res.status(200).send(obj);
};