var express = require('express');
var router = express.Router();
var compareController = require('../controllers/CompareController');

router.post('/compareTimetables', compareController.compare_timetables);

module.exports = router;