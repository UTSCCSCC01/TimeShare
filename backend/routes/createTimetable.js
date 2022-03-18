var express = require('express');
var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

router.post('/createTimetable', TimetableController.create_timetable);
router.post('/addCourse', TimetableController.add_course);
router.post('/removeCourse', TimetableController.remove_course);
router.post('/getCourses', TimetableController.get_courses);

module.exports = router;
