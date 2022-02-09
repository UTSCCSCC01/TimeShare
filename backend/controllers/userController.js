var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
require('../models/User');
var User = mongoose.model('User');

const createUser = asyncHandler(async (req, res) => {
    const { userName, userEmail, password } = req.body
    
    let existingUser = await User.findOne({email: userEmail})
    if (existingUser) {
        res.status(400)
        throw new Error("That user already exists")
    }

    var newUser = new User({username: userName, email: userEmail})
    newUser.setPassword(password)
    newUser.save(function(err) {
        if (err) {
            throw new Error(`Error while saving to DB`);
        }
    })

    res.status(200).send('sucessfully created user')
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

module.exports = {
    createUser,
    getUsers
}