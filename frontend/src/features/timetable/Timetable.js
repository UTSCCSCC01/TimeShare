// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './Timetable.module.css';

class Timetable {
    constructor() {
        this.courses = [];
    }

    add_course(course_name) {
        // Add course to this timetable
        // console.log("entered!");
        for (let i = 0; i < all_courses_object.length; i++) {
            // console.log("a");
            if (course_name.localeCompare(all_courses_object[i].course_name) == 0) {
                console.log("added!");
                this.courses.push(all_courses_object[i]);
            }
        }
    }

    remove_course(course_name) {
        // Add course to this timetable
        
        for (let i = 0; i < this.courses.length; i++) {
            if (course_name.localeCompare(this.courses[i].course_name) == 0) {
                console.log("Removed!");
                this.courses.splice(i, 1);
                console.log(this.courses);
            }
        }

       
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
const { ConnectionCheckOutStartedEvent } = require("mongodb");
var text = fs.readFileSync("./courses_sample.txt") + '';
var all_courses = text.split("\n");
var all_courses_object = [];
var temp;
var timetable = new Timetable();


function createCourseObjects() {
    for (let i = 0; i < all_courses.length; i++) {
        // split by commas to get each attribute
        temp = all_courses[i].split(",");
        // console.log(temp);
        temp_course = new Course(temp[0], temp[1], temp[2], temp[3]);
        all_courses_object.push(temp_course);
    }
}

function displayCourseSelection() {
    console.log("--------- Course Selection ---------");
    for (let i = 0; i < all_courses_object.length; i++) {
         //console.log('Course: ${all_courses_object[i].name}, Start time: ${all_courses_object[i].start_time}, End time: ${all_courses_object[i].end_time}, Day: ${convert_day(all_courses_object[i].day}'); 
        console.log("Course: %s, Start time: %s, End time: %s, Day: %s", all_courses_object[i].course_name,
         all_courses_object[i].start_time, all_courses_object[i].end_time, convert_day(all_courses_object[i].day));
    }
}

function displayMyTimetable() {
    console.log("--------- Timetable ---------");
    for (let i = 0; i < timetable.courses.length; i++) {
         //console.log('Course: ${all_courses_object[i].name}, Start time: ${all_courses_object[i].start_time}, End time: ${all_courses_object[i].end_time}, Day: ${convert_day(all_courses_object[i].day}'); 
        console.log("Course: %s, Start time: %s, End time: %s, Day: %s", timetable.courses[i].course_name,
        timetable.courses[i].start_time, timetable.courses[i].end_time, convert_day(timetable.courses[i].day));
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



process.stdin.on('data', function(data) {
    temp = data.toString().split(" ");
    console.log(temp[0]);

    
    temp[0] = temp[0].replace(/(\r\n|\n|\r)/gm,"");
    if (temp[0].localeCompare("add") == 0) {
        temp[1] = temp[1].replace(/(\r\n|\n|\r)/gm,"");
        console.log(temp[1]);
        timetable.add_course(temp[1]);
    } else if (temp[0].localeCompare("courses") == 0) {
        console.log("ENTERED!");
        displayCourseSelection();
    } else if (temp[0].localeCompare("timetable") == 0) {
        displayMyTimetable();
    } else if (temp[0].localeCompare("remove") == 0) {
        temp[1] = temp[1].replace(/(\r\n|\n|\r)/gm,"");
        timetable.remove_course(temp[1]);
    }

    // Add
    // display
    // remove
    

});






