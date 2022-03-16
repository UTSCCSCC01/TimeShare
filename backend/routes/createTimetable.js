var express = require('express');
var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

router.post('/createTimetable', TimetableController.create_timetable);

router.post('/createPost', TimetableController.create_post);
router.get('/getPost', TimetableController.get_post);

router.post('/addCourse', TimetableController.add_course);
router.post('/removeCourse', TimetableController.remove_course);
router.get('/getCourses', TimetableController.get_courses);
router.get('/getAllCourses', TimetableController.get_courses);

module.exports = router;
