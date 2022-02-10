var mongoose = require('mongoose');
// require('../models/User');
require('../models/Timetable');
// var User = mongoose.model('User');

var Timetable = mongoose.model('Timetable');
var Course = mongoose.model('Course');

exports.compare_timetables = async function(req, res) {
    // return res.status(200).send('hello!');
    var table1_id = req.body.timetable1_id
    var table2_id = req.body.timetable2_id

    var timetable1 = await Timetable.findOne({timetable_id: table1_id});
    var timetable2 = await Timetable.findOne({timetable_id: table2_id});

    if (!(timetable1)) {
        return res.status(400).send('Timetable ' + table1_id + ' does not exist within the dataset');
    }
    if (!(timetable2)) {
        return res.status(400).send('Timetable ' + table2_id + ' does not exist within the dataset');
    }

    if (table1_id == table2_id) {
        return res.status(400).send('Second timetable is the same');
    }

    // TODO: Comparison here
    var courses1_ids = timetable1.courses;
    var courses2_ids = timetable2.courses;
    let shared = 0;
    let shared_course_ids = "";

    for (let i = 0; i < courses1_ids.length; i++) {
        let course = await Course.findOne({_id: courses1_ids[i]});
        for (let j = 0; j < courses2_ids.length; j++) {
            if (courses1_ids[i].equals(courses2_ids[j])) {
                shared++;
                shared_course_ids = shared_course_ids.concat(course.course_id, "<br/>");
            }
        }
    }
    
    console.log("compared timetable " + table1_id + " with " + table2_id + " successfully");

    res.status(200).send('You have ' + shared + ' shared courses <br/>' + 'The following courses are shared: <br/>' + shared_course_ids);
}