var mongoose = require('mongoose');
require('../models/Timetable');
require('../models/Course');
// require('../models/Tutorial');
// require('../models/Lecture');
// require('../models/Course');
// var Tutorial = mongoose.model('Tutorial');
// var Lecture = mongoose.model('Lecture')
// var Course = mongoose.model('Course');

var Timetable = mongoose.model('Timetable');
var Course = mongoose.model('Course');


exports.create_timetable = async function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    // Create an empty timtable
    let existingTable = await Timetable.findOne({timetable_id: id});
    if (existingTable) {
        return res.status(400).send('That timetable already exists');
    }



    var newTimetable = new Timetable({timetable_name: name, courses: [], lectures: [], tutorials: [], timetable_id: id});
    // var newTimetable = new Timetable({timetable_name: name, timetable_id: id});
    
    // Make sure u pass in all values, 
    newTimetable.save(function(err) {
        if (err) {
            return new Error(`Error while saving to DB`);
        }
    });
    // IDs will need to be uniquely generated ^

    res.status(200).send(name);
    // For now just send back 200
}

// Might have to be its own controller i dunno tbh
exports.add_course = async function(req, res) {

    console.log("hey");
    // name of course to add
    var course_id = req.body.course_id;
    var timetable_id = req.body.timetable_id;
    // find this course in course database

    
    let existingCourse = await Course.findOne({course_id: course_id});
    if (existingCourse) {
        // logic for adding course to our user's courses

        // Find the 
        console.log("Entered");
        let timetable_we_want = await Timetable.findOne({timetable_id: timetable_id});

        // dont know how to append so just do this for now
        // timetable_we_want.update({timetable_name: "test danny"});
        // timetable_we_want.update({ $push: { courses: existingCourse } });
        // timetable_we_want.update({timetable_name: "HELLOOOO"}, upsertData, {upsert: true}, function(err{});
        // if (timetable_we_want.courses == null) {
        //     timetable_we_want.courses = [];
        // }
        
        timetable_we_want.courses.push(existingCourse);
        console.log("Objects: %0", timetable_we_want.courses);
        timetable_we_want.save(function(err) {
            if (err) {
                return new Error(`Error while saving to DB`);
            }
        });
        timetable_we_want.populate("courses");
        res.status(200).send(timetable_we_want);
        
    } else { // logic for when the course doesn't exist
        return res.status(404).send('Course doesn\'t exist');
    }
}

exports.remove_course = async function(req, res) {

    console.log("hey");
    // name of course to add
    var course_id = req.body.course_id;
    var timetable_id = req.body.timetable_id;
    // find this course in course database

    
    let existingCourse = await Course.findOne({course_id: course_id});
    if (existingCourse) {
        // logic for deleting course to our user's courses

        // Find the 
        console.log("Entered");
        let timetable_we_want = await Timetable.findOne({timetable_id: timetable_id});

        // if it doesnt find the timetable --> error

        // if the course isn't in the timetable --> error or fail silently

        const index = timetable_we_want.courses.indexOf(existingCourse._id); // error check here
        console.log("Index = %0", index);
        if (index >= 0) {
            timetable_we_want.courses.splice(index, 1);
        
            timetable_we_want.save(function(err) {
                if (err) {
                    return new Error(`Error while saving to DB`);
                }
            });
        }

        timetable_we_want.populate("courses");
        res.status(200).send(timetable_we_want);
        
    } else { // logic for when the course doesn't exist
        return res.status(404).send('Course doesn\'t exist');
    }
}