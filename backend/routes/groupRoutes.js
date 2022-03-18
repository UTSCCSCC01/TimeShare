const express = require('express');
const { getGroup, createGroup, updateGroup, joinGroup } = require('../controllers/GroupController');
const router = express.Router();
const {
    authorize
} = require("../middleware/authMiddleware")

router.post('/', authorize, createGroup)
router.put('/', authorize, updateGroup)
router.get('/:name', getGroup)
router.post("/join", authorize, joinGroup)

module.exports = router