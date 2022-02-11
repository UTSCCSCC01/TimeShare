var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
require('../models/User');
var User = mongoose.model('User');

const createUser = asyncHandler(async function(req, res){
    const { username, useremail, password } = req.body
    let existingUser = await User.findOne({email: useremail})
    if (existingUser) {
        res.status(400)
        throw new Error("That user already exists")
    }

    var newUser = new User({username: username, email: useremail})
    newUser.setPassword(password)
    newUser.save(function(err) {
        if (err) {
            return new Error(`Error while saving to DB`);
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

const loginUser = asyncHandler(async (req, res) =>{
    const user = await User.findOne({username: req.body.username});
    if(!user) {
        return res.status(400).send('username or password was incorrect');
    }

    let passwordCorrect = await user.validPassword(req.body.password);

    if(!passwordCorrect) {
        return res.status(400).send('username or password was incorrect');
    }

    return res.status(200).send(`sucessfully logged in as ${user.username}!`);
})

module.exports = {
    createUser,
    getUsers,
    loginUser,
}