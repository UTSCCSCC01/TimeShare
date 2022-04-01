var express = require('express');
const {
    authorize
} = require("../middleware/authMiddleware")

var router = express.Router();
var TimetableController = require('../controllers/TimetableController');

// const {
//     authorize
// } = require("../middleware/authMiddleware")

router.post('/createTimetable', TimetableController.create_timetable);
router.post('/getTimetable', TimetableController.get_timetable);

// router.post('/createPost', authorize, TimetableController.create_post);
router.post('/createPost', TimetableController.create_post);
router.get('/getPost', TimetableController.get_post);
router.get('/getPost2/:postId', TimetableController.get_post2);

router.post('/GetAllPostsByLabel', TimetableController.GetAllPostsByLabel);

router.post('/addCourse', TimetableController.add_course);
router.post('/removeCourse', TimetableController.remove_course);

router.get('/getCourses', TimetableController.get_courses);
router.post('/createTimetable2', authorize, TimetableController.create_timetable2);
router.get('/getAllCourses', TimetableController.get_courses);


router.post('/createComment', TimetableController.create_comment)
router.post('/getComment', TimetableController.get_comment)
router.post('/readIcsFile', TimetableController.readIcsFile);

module.exports = router;
