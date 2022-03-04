const jwt = require('jsonwebtoken')
const jwtSecret = 'd545f45cc4b0259fb891b9857c1eea26fef114dafc397a4a73b1f5d655da2ead'
const asyncHandler = require('express-async-handler')
require('../models/User');
const mongoose = require('mongoose');
var User = mongoose.model('User');

const authorize = asyncHandler(async (req, res, next) => {
    let token

    if (req.header.authorization && req.header.authorization.startsWith('Bearer')){
        try {
            // Extraction the token
            token = req.headers,authorization.split(' ')[1]

            // Verify the token
            const data = jwt.verify(token, jwtSecret)

            req.user = await User.findById(data.userId).select('-password')
            next()
        } catch (error) {
            console.log('Authentication error: ' + error)
            return res.json({
                "Error" : 'User is not authorized'
            });
        }
    }

    if (!token){
        return res.json({
            "Error" : 'No authorization token is present'
        });
    }
})

module.exports = {
    authorize
}