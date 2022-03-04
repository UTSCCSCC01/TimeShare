const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    loginUser,
} = require("../controllers/userController")

const {
    authorize
} = require("../middleware/authMiddleware")

/**
 * In order to protect a page with authorization token do the following:
 * Provide authorize as a second argument when routing the path
 * 
 * E.g. router.post('/userProfile', authorize, userProfile);
 * 
 * If user is authorized you will be able to use user data as follows: req.user.id, req.user.username, etc.
 */

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/login', loginUser);

module.exports = router;