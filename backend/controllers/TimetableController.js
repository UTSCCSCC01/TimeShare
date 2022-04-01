var mongoose = require("mongoose");

require("../models/Timetable");
require("../models/Course");
require('../models/Tutorial');
require('../models/Lecture');
require('../models/Post');
require('../models/Comment');

var Timetable = mongoose.model("Timetable");
var Course = mongoose.model("Course");
var Lecture = mongoose.model("Lecture");
var Tutorial = mongoose.model("Tutorial");
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
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

// exports.create_post = async function (req, res) {

  // Get the name and id from the post request
  // var post_id = req.body.post_id;
  // var name = req.body.name;
  // var timetable_id = req.body.timetable_id;
  // var desc = req.body.desc;
  // var owner = req.body.owner;

  // if (!req.files || !req.files.image) {
  //   var image = "";
  // } else {
  //   var image = req.files.image;
  // }
  

//   // Create an empty timtable
//   let existingTable = await Timetable.findOne({ timetable_id: timetable_id });
 
//   if (!existingTable) {
//     return res.status(400).send("That timetable does not exist");
//   }

//   let existingPost = await Post.findOne({ post_id: post_id });

//   if (existingPost) {
//     return res.status(400).send("That post already exists");
//   }

//   var newPost = new Post({
//     post_id: post_id,
//     post_name: name,
//     description: desc,
//     timetable: existingTable,
//   });

exports.create_post = async function (req, res) {

    // Get the name and id from the post request
    // var post_id = req.body.post_id;
    var name = req.body.name;
    // let owner = req.user._id;
    var timetable_id = req.body.timetable_id;
    var desc = req.body.desc;
    var label2 = req.body.label;
    console.log(req.body)
    console.log(label2)
    console.log(timetable_id)
    // Create an empty timtable
    let existingTable = await Timetable.findOne({ _id: timetable_id });
   
    if (!existingTable) {
      console.log("NOT A TIMETABLE")
      return res.send("That timetable does not exist");
    }
  
    // let existingPost = await Post.findOne({ post_id: post_id });
  
    // if (existingPost) {
    //   console.log("AAYOOOO")
    //   return res.status(400).send("That post already exists");
    // }
    // console.log(name)
    // console.log(desc)
    // console.log(existingTable)
    var newPost = new Post({
      // owner: owner,
      post_label: label2,
      post_id: 400,
      post_name: name,
      description: desc,
      timetable: existingTable,
    });
    
  

  // save to database
  await newPost.save(function (err) {
    if (err) {
      console.log("COULDNT SAVE")
      console.log(err)
      return res.json(err);
    } 
  });

 
  res.status(200).send(newPost);
};

exports.create_comment = async function (req, res) {
  console.log("ENTERED CREATE COMMENT!!!")
  // Get the name and id from the post request
  // var post_id = req.body.post_id;
  var content = req.body.content;
  // let owner = req.user._id;
  var post_id = req.body.post_id;
  // var user_id = req.body.user;
  console.log(post_id)
  // Create an empty timtable
  let existingPost = await Post.findOne({ _id: post_id });
  // let existingUser = await User.findOne({ _id: user_id });
  console.log(existingPost)

  if (!existingPost) {
    console.log("NOT SOMETHING")
    return res.send("That something does not exist");
  }


  let user_id = req.body.user_id;

  let user_name;
  if(user_id) {
    let user = await User.findOne({_id: user_id});
    user_name = user.username;
  }
  else {
    user_name = 'Anonymous user';
  }

  
  var newComment = new Comment({
    // owner: owner,
    // post_label: label2,
    // post_id: 400,
    // post_name: name,
    // description: desc,
    // timetable: existingTable,
    content: content,
    post: existingPost,
    commenter: user_name,
    // user: existingUser,
  });
  


  // save to database
  await newComment.save(function (err) {
    if (err) {
      console.log("COULDNT SAVE")
      console.log(err)
      return res.json(err);
    } 
  });

  let Comments = await Comment.find({ post: post_id });
  Comments.push(newComment)
  // console.log(Comments)
  res.status(200).send(Comments);
};

exports.get_comment = async function (req, res) {
  console.log("WE MADE IT!!!!!!!!!!")
  var post_id = req.body.post_id;

  let comments = await Comment.find({ post: post_id });
  // console.log(comments)
  return res.status(200).send(comments);

}

exports.get_post2 = async function (req, res) {
  console.log("SHOULD SEE THIS")
  console.log(req.params['postId'])
  var post_id = req.params['postId'];
  let existingPost = await Post.findOne({ _id: post_id });

  res.status(200).send(existingPost);

  

}


exports.get_post = async function (req, res) {

  // Get the name and id from the post request
  var post_id = req.body.post_id;

  // Create an empty timtable
  let existingPost = await Post.findOne({ post_id: post_id });
 
  if (!existingPost) {
    return res.status(400).send("That post does not exist");
  }
 
  res.status(200).send(existingPost);
};

exports.get_timetable = async function (req, res) {

  // Get the name and id from the post request
  
  var timetable_id = req.body.timetable_id;
  console.log(req.body)
  // Create an empty timtable
  let existingPost = await Timetable.findOne({ timetable_id: timetable_id });
  console.log()
  if (!existingPost) {
    console.log(existingPost)
    return res.status(404).send("That tt does not exist");
  }
 
  res.status(200).send(existingPost);
};

exports.GetAllPostsByLabel = async function (req, res) {
  console.log("WE MADE IT!")
  var label2 = req.body.label;
  console.log(label2)
  let Posts = await Post.find({ post_label: label2 });
  console.log(Posts)
  return res.status(200).send(Posts);

}

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

  let timetable_we_want = await Timetable.findOne({ timetable_id: id });

  if (timetable_we_want) {

    var lecture_ids = timetable_we_want.lectures;
    var tut_ids = timetable_we_want.tutorials;
    let courses = [];

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
      }
      else {
        tutorials.push(mongoose.Types.ObjectId(section.id))
      }

      let tokens = section.name.split(" ")
      let course_id = tokens[0]
      courses.push(course_id)
    })
  })

 
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
  
  res.status(200).send(newTimetable);
};

const mapTimetableObjectToFrontend = async function (timetable_object_id) {

  // const timetable_object_id = req.body.timetable_object_id

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

  for(const section of timetable_object['tutorials']) {
    let tutorial_section_obj = await Tutorial.findOne({ _id: section });
    let tutorial_section = tutorial_section_obj._doc
    let name = tutorial_section.course_id + " " + "PRA" + tutorial_section.tutorial_id
    let day = tutorial_section.time[0]
    let startTime = tutorial_section.time[1]
    let endTime = tutorial_section.time[2]
  
    section_obj = {
      id: section,
      name: name,
      type: 'tutorial',
      day: day,
      startTime: startTime,
      endTime: endTime,
    }
    obj[tutorial_section.time[0][0].toLowerCase()].push(section_obj)

  }
  // res.status(200).send(obj);
  return obj;
}

exports.get_all_courses = async function (req, res) {
  let lectures = await Lecture.find();

  let tutorials = await Tutorial.find();

  let courses = lectures.concat(tutorials)
  return res.status(200).send(courses);

};

exports.readIcsFile = async function (req, res) {
  let ics_file = req.files.timetable;
  let schedule_raw = (ics_file.data).toString();
  let classes = [];

  // Parsing data from ics file
  var startIndex = 0, index;
  while ((index = schedule_raw.indexOf("SUMMARY:", startIndex)) > -1) {
    classes.push((schedule_raw.substring(index, schedule_raw.indexOf("STATUS:", index))).split("\r\n"));
    startIndex = index + "SUMMARY:".length;
  }

  // Final schedule variable
  let schedule = [];

  // Iterating through each course description and confirming the course with the database
  for (let classDescription of classes){
    // Getting course information (course code, lec/tut/pra sections)
    let course_info = classDescription[0].split(" ");
    let course_code = course_info[0].substring("SUMMARY:".length);

    // Get course from the database
    let course = await Course.findOne({ course_id : course_code });

    if (course){
      let lec_tut = course_info[1].substring(0, 1) + course_info[1].substring(3);
      let lecture, tutorial = null;

      // Getting class time
      let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let start_time = new Date(getDate(classDescription[1].substring(classDescription[1].indexOf(":") + 1)));
      let end_time = new Date(getDate(classDescription[2].substring(classDescription[2].indexOf(":") + 1)));
      
      if (lec_tut[0] === "L"){
        lecture = await Lecture.findOne({ course_id : course_code, lecture_id : lec_tut });
      } else if (lec_tut === "T" || lec_tut === "P"){
        tutorial = await Tutorial.findOne({ course_id : course_code, tutorial_id : lec_tut });
      }
      
      if (lecture){
        let exists = false;

        lecture.time.forEach((date) => {
          if (date.day === weekdays[start_time.getDay()] && 
              date.start === weekdays[start_time.getHours()] && 
              date.end === weekdays[end_time.getHours()]){
            schedule.push(lecture);
            exists = true;
          }
        });

        if (!exists){
          console.log("Error: Lecture during the time " + start_time.getHours() + "-" + end_time.getHours() + " does not exist!");
        }
      } else if (tutorial) {
        if (tutorial.time.day === weekdays[start_time.getDay()] && 
            tutorial.time.start === weekdays[start_time.getHours()] && 
            tutorial.time.end === weekdays[end_time.getHours()]){
          schedule.push(tutorial);
        } else {
          console.log("Error: Tutorial during the time " + start_time.getHours() + "-" + end_time.getHours() + " does not exist!");
        }
      } else {
        console.log("Error: LEC/TUT " + lec_tut + " for course " + course_code + " does not exist!");
      }
    } else {
      console.log("Error: Course " + course_code + " does not exist!");
    }
  }
  
  res.status(200).send(schedule);  
};

const getDate = (date_time) => {
  let date = "";

  date = date_time.substring(0, 4) + "-" + 
         date_time.substring(4, 6) + "-" + 
         date_time.substring(6, 8) + "T" +
         date_time.substring(9, 11) + ":" +
         date_time.substring(11, 13) + ":" + 
         date_time.substring(13);

  return date;
}