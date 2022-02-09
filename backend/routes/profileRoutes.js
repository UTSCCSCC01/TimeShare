const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, deleteProfiles } = require('../controllers/profileController');

router.get('/', getProfiles)
router.get('/:userName', getProfiles)
router.post('/', createProfile)
router.delete('/', deleteProfiles)
router.delete('/:profileId', deleteProfiles)


module.exports = router