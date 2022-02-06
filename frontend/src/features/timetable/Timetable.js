// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './Timetable.module.css';

class Timetable {
    constructor(name, day, start_time) {
        this.courses = [];
    }

    add_course(course_to_add) {
        // Add course to this timetable
        this.courses.push(course_to_add);
    }

    remove_course(course_to_add) {
        // Add course to this timetable
        const index = this.courses.indexOf(course_to_add);
        this.courses.splice(index, 1);
    }
}

class Course {
    constructor(name, start_time, end_time, day) {
        this.course_name = name;
        // between 8 and 18
        this.start_time = start_time;
        // between 8 and 18
        this.end_time = end_time;
        // between 0 and 4
        this.day = day;
    }
}

class Lecture extends Course {
    constructor(name, start_time, end_time, day, lec_id) {
        super(name, start_time, end_time, day)
        this.lec_id = lec_id;
    }
}

var fs = require("fs");
var text = fs.readFileSync("./courses_sample.txt") + '';
var all_courses = text.split("\n");
var all_courses_object = [];
var temp;

function createCourseObjects() {
    for (let i = 0; i < all_courses.length; i++) {
        // split by commas to get each attribute
        temp = all_courses[i].split(",");
        // console.log(temp);
        temp_course = new Course(temp[0], temp[1], temp[2], temp[3]);
        all_courses_object.push(temp_course);
    }
}

function displayTimetable() {
    console.log("-------------- Timetable --------------");
    for (let i = 0; i < all_courses_object.length; i++) {
         //console.log('Course: ${all_courses_object[i].name}, Start time: ${all_courses_object[i].start_time}, End time: ${all_courses_object[i].end_time}, Day: ${convert_day(all_courses_object[i].day}'); 
        console.log("Course: %s, Start time: %s, End time: %s, Day: %s", all_courses_object[i].course_name,
         all_courses_object[i].start_time, all_courses_object[i].end_time, convert_day(all_courses_object[i].day));
    }
}

function convert_day(day_num) {
    if (day_num == 0) {
        return "Monday";
    } else if (day_num == 1) {
        return "Tuesday";
    } else if (day_num == 2) {
        return "Wednesday";
    } else if (day_num == 3) {
        return "Thursday";
    } else if (day_num == 4) {
        return "Friday";
    }
}

createCourseObjects();
console.log("Hi");


// var stdinBuffer = fs.readFileSync(0); // 
// console.log(stdinBuffer.toString());



// process.stdin.on('data', function(data) {
//     temp = data.toString().split(" ");
//     console.log(temp[0]);
//     console.log(all_courses_object[0]);

// });

displayTimetable();




