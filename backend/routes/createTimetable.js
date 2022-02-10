var express = require('express');
var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

router.post('/createTimetable', TimetableController.create_timetable);
router.post('/addCourse', TimetableController.add_course);
router.post('/removeCourse', TimetableController.remove_course);

module.exports = router;