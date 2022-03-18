var mongoose = require('mongoose');
// require('../models/User');
require('../models/Timetable');
// var User = mongoose.model('User');

var Timetable = mongoose.model('Timetable');
var Course = mongoose.model('Course');
var Lecture = mongoose.model('Lecture');
var Tutorial = mongoose.model('Tutorial');

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

    // Comparison revised
    var lectures1 = timetable1.lectures
    var tutorials1 = timetable1.tutorials
    var lectures2 = timetable2.lectures
    var tutorials2 = timetable2.tutorials

    // Results stored here
    var shared = []
    var sharedNotsame1 = []
    var sharedNotsame2 = []
    var unshared1 = []
    var unshared2 = []

    for (let i = 0; i < lectures1.length; i++) {
        let lecture = await Lecture.findOne({_id: lectures1[i]});
        if (lectures2.includes(lectures1[i])) {
            shared.push(lecture);
        } else if (timetable2.courses.includes(lecture.course_id)){
            sharedNotsame1.push(lecture);
        } else {
            unshared1.push(lecture);
        }
    }

    for (let i = 0; i < lectures2.length; i++) {
        let lecture = await Lecture.findOne({_id: lectures2[i]});
        if (!lectures1.includes(lectures2[i]) && timetable1.courses.includes(lecture.course_id)){
            sharedNotsame2.push(lecture);
        } else if (!lectures1.includes(lectures2[i])) {
            unshared2.push(lecture);
        }
    }

    for (let i = 0; i < tutorials1.length; i++) {
        let tutorial = await Tutorial.findOne({_id: tutorials1[i]});
        if (tutorials2.includes(tutorials1[i])) {
            shared.push(tutorial);
        } else if (timetable2.courses.includes(tutorial.course_id)){
            sharedNotsame1.push(tutorial);
        } else {
            unshared1.push(tutorial);
        }
    }

    for (let i = 0; i < tutorials2.length; i++) {
        let tutorial = await Tutorial.findOne({_id: tutorials2[i]});
        if (!tutorials1.includes(tutorials2[i]) && timetable1.courses.includes(tutorial.course_id)){
            sharedNotsame2.push(tutorial);
        } else if (!tutorials1.includes(tutorials2[i])) {
            unshared2.push(tutorial);
        }
    }

    // Comparison here
    // var courses1_ids = timetable1.courses;
    // var courses2_ids = timetable2.courses;
    // var lecture1_ids = timetable1.lectures;
    // var lecture2_ids = timetable2.lectures;
    // var tutorial1_ids = timetable1.tutorials;
    // var tutorial2_ids = timetable2.tutorials;
    // let shared = 0;
    // let result = "";

    // for (let i = 0; i < courses1_ids.length; i++) {
    //     let lecture = null;
    //     let lec_id;
    //     let tutorial = null;
    //     let tut_id;
    //     let tab = "&nbsp&nbsp&nbsp&nbsp"  // For indentation

    //     // Find lecture for timetable 1
    //     for (let k = 0; k < lecture1_ids.length && lecture == null; k++) {
    //         lecture = await Lecture.findOne({_id: lecture1_ids[k], course_id: courses1_ids[i]});
    //         lec_id = lecture1_ids[k];
    //     }

    //     // Find tutorial for timetable 1
    //     for (let k = 0; k < tutorial1_ids.length && tutorial == null; k++) {
    //         tutorial = await Tutorial.findOne({_id: tutorial1_ids[k], course_id: courses1_ids[i]});
    //         tut_id = tutorial1_ids[k];
    //     }

    //     for (let j = 0; j < courses2_ids.length; j++) {
    //         if (courses1_ids[i] == courses2_ids[j]) {
    //             shared++;
    //             result = result.concat(courses1_ids[i], "<br/>");
                
    //             // Compare lectures (only if found on timetatble1)
    //             if (lecture != null) {
    //                 for (let k = 0; k < lecture2_ids.length; k++) {
    //                     if (lecture2_ids[k].equals(lec_id)) {
    //                         result = result.concat(tab, "LEC", lecture.lecture_id, "<br/>");
    //                     }
                        
    //                 }
    //             }

    //             // Compare tutorials (only if found on timetable1)
    //             if (tutorial != null) {
    //                 for (let k = 0; k < tutorial2_ids.length; k++) {
    //                     if (tutorial2_ids[k].equals(tut_id)) {
    //                         result = result.concat(tab, "TUT", tutorial.tutorial_id, "<br/>");
    //                     }
    //                 }
    //             }

    //         }
    //     }
    // }

    // Comparison revised
    // var courses1_ids = timetable1.courses;
    // var courses2_ids = timetable2.courses;
    // var shared_course_ids = []
    // var shared_lecture_ids = []
    // var shared_tutorial_ids = []

    // for (let i = 0; i < courses1_ids.length; i++) {
    //     if (courses2_ids.includes(courses1_ids[i])) {
    //         shared_course_ids.push(courses1_ids[i]);
    //         let lecture1 = await Lecture.findOne({ course_id: courses1_ids[i] });
    //         let lecture2 = await Lecture.findOne({ course_id: courses1_ids[i] });

    //         if (lecture1 == lecture2) {
    //             shared_lecture_ids.push()
    //         }

    //         let tutorial1 = await Tutorial.findOne({ course_id: courses1_ids[i] });
    //         let tutorial2 = await Tutorial.findOne({ course_id: courses1_ids[i] });

    //         if (lecture1 == lecture2) {
    //             shared_lecture_ids.push()
    //         }
    //     }
    // }

    res.status(200).send([shared, sharedNotsame1, sharedNotsame2, unshared1, unshared2]);// + '<br/> Table1\'s courses: <br/>');

    // send an array of two timetables: first is recommendation for first timetable and second is recommendation for second timetable
    // timetable1 vs timetable2 as input
    // 
}