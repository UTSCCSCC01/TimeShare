const express = require('express');
const { getGroup, createGroup, updateGroup, joinGroup, viewGroup } = require('../controllers/GroupController');
const router = express.Router();
const {
    authorize
} = require("../middleware/authMiddleware")

router.post('/', authorize, createGroup)
router.put('/', authorize, updateGroup)
router.get('/:name', getGroup)
router.post("/join", authorize, joinGroup)
router.get("/viewGroup/:group_id", viewGroup)

module.exports = router