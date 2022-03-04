const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, deleteProfiles, updateProfile } = require('../controllers/profileController');

router.get('/', getProfiles)
router.get('/:userName', getProfiles)
router.post('/', createProfile)
router.delete('/', deleteProfiles)
router.delete('/:profileId', deleteProfiles)
router.put("/", updateProfile)

module.exports = router