const mongoose = require('mongoose');
// var TutorialSchema = mongoose.model('Tutorial');
// var LectureSchema = mongoose.model('Lecture')
// var CourseSchema = mongoose.model('Course');
var crypto = require('crypto');


const TimetableSchema = mongoose.Schema({

    timetable_id: {
        type: Number,
    },

    timetable_name: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        sparse: true,
    },
    // Send help
    courses: {
        // type: [CourseSchema],
        unique: false,
        array_of_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    },
    lectures: {
        unique: false,
        array_of_lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
        // type: [LectureSchema],
    },

    tutorials: {
        unique: false,
        array_of_tutorials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
        // type: [TutorialSchema],
    },


});


TimetableSchema.methods.add_lecture = function(course, lecture_id) {
    // iterate through all courses, find course code, then iterate through that courses lecture to find the lecture_id, hten append to array of lecs
    // also when you add a course lecture, you add to array_of_courses the course, if not already in courses (already checked in controller)
    // Ask burhan how to iterate th
}

mongoose.model('Timetable', TimetableSchema);