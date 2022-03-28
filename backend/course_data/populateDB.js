const connectDB = require('../db/conn')
var mongoose = require("mongoose");

connectDB()

require("../models/Course");
require('../models/Tutorial');
require('../models/Lecture');
var Course = mongoose.model("Course");
var Lecture = mongoose.model("Lecture");
var Tutorial = mongoose.model('Tutorial');


const populateDB = async () => {
    const data = require('./courses.json')

    data.forEach(async course => {
        mg_tutorials = []
        mg_lectures = []
        course.lectures.forEach(
            ({course_id, lecture_id, time}) => {
                // console.log(time)
                mg_lectures.push(Lecture({course_id, lecture_id, time}))
                // console.log(course_id, lecture_id, time)
            }
        )
        // console.log(mg_lectures)
        course.tutorials.forEach(
            ({course_id, tutorial_id, time}) => {
                mg_tutorials.push(Tutorial({course_id, tutorial_id, time}))
            }
        )
        // console.log(mg_tutorials[0])
        Lecture.insertMany(mg_lectures, (err, docs) => {
            if(err){
                console.log("Error inserting")
                console.log(err)
            }
        })

        Tutorial.insertMany(mg_tutorials, (err, docs) => {
            if(err){
                console.log("Error inserting")
                console.log(err)
            }
        })

        let {course_name, course_id, description} = course
        course = Course({course_name, course_id, description, lectures: mg_lectures.map(x => x._id), tutorials: mg_tutorials.map(x => x._id)})
        console.log(course)
        let status = await course.save()

        if(!status){
            console.log("Error saving course")
        }
    })
}

populateDB()