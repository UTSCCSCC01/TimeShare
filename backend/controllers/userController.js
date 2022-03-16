var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const { createProfile } = require('./profileController');
const jwtSecret = 'd545f45cc4b0259fb891b9857c1eea26fef114dafc397a4a73b1f5d655da2ead'
require('../models/User');
var User = mongoose.model('User');


const createUser = asyncHandler(async function(req, res, next){
    const { username, useremail, password } = req.body
    
    var newUser = new User({username: username, email: useremail})
    newUser.setPassword(password)
    await newUser.save(function(err) {
        if (err) {
            return res.json({
                err
            })
        }
    })

    req.body['uid'] = newUser._id
    await createProfile(req, res, next)
    // return res.send('sucessfully created user')
})

const getUsers = asyncHandler(async (req, res) => {
    let users = await User.find({})
    if (users){
        res.status(200).json(users)
    }
    else{
        throw new Error('Error getting users')
    }
})

const loginUser = asyncHandler(async (req, res) =>{
    const {username, password} = req.body
    const user = await User.findOne({username});

    if(!user) {
        return res.json({
            "Error" : 'User with such username does not exist!'
        });
    }

    let passwordCorrect = await user.validPassword(password);

    if(!passwordCorrect) {
        return res.json({
            "Error" : 'Username or password was incorrect'
        });
    }

    res.json({
        _id: user._id,
        username: user.username,
        token: generateJWT(user._id)
    })
})

const generateJWT = (userId) => {
    return jwt.sign({userId}, jwtSecret, {
        expiresIn: '1d'
    })
}

module.exports = {
    createUser,
    getUsers,
    loginUser,
}