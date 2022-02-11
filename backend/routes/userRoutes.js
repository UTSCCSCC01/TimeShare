const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers
} = require("../controllers/userController")

router.get('/', getUsers);
router.post('/create', createUser);

module.exports = router;