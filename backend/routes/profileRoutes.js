const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, deleteProfiles, updateProfile } = require('../controllers/profileController');
const {
    authorize
} = require("../middleware/authMiddleware")

router.get('/', authorize, getProfiles)
router.get('/:username', getProfiles)
router.post('/', createProfile)
router.delete('/', deleteProfiles)
router.delete('/:profileId', deleteProfiles)
router.put("/", authorize, updateProfile)

module.exports = router