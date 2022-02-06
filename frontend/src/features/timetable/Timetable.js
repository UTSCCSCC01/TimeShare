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

class Tutorial extends Course {
    constructor(name, start_time, end_time, day, tut_id) {
        super(name, start_time, end_time, day)
        this.tut_id = tut_id;
    }
}


function Timetable() {


    return 1;
}