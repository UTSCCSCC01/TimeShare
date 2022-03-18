var express = require('express');
const {
    authorize
} = require("../middleware/authMiddleware")

var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

router.post('/createTimetable', TimetableController.create_timetable);
router.post('/addCourse', TimetableController.add_course);
router.post('/removeCourse', TimetableController.remove_course);
router.get('/getCourses', TimetableController.get_courses);
router.post('/createTimetable2', authorize, TimetableController.create_timetable2);
module.exports = router;
