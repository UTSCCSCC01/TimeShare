const express = require('express');
const { getGroup, createGroup, updateGroup } = require('../controllers/GroupController');
const router = express.Router();
const {
    authorize
} = require("../middleware/authMiddleware")

router.post('/', authorize, createGroup)
router.put('/', authorize, updateGroup)
router.get('/:name', getGroup)

module.exports = router