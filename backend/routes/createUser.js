var express = require('express');
var router = express.Router();
var createUserController = require('../controllers/CreateUserController');

router.post('/createUser', createUserController.create_user);

module.exports = router;