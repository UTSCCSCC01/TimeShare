var express = require('express');
var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

router.post('/createTimetable', TimetableController.create_timetable);

module.exports = router;