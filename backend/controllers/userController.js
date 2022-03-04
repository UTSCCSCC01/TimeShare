var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
require('../models/User');
var User = mongoose.model('User');

const createUser = asyncHandler(async function(req, res){
    const { username, useremail, password } = req.body
    
    var newUser = new User({username: username, email: useremail})
    newUser.setPassword(password)
    newUser.save(function(err) {
        if (err) {
            return res.json({
                err
            })
        }
        else {
            return res.send('sucessfully created user')
        }
    })

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
    const user = await User.findOne({username: req.body.username});
    if(!user) {
        res.status(400).send('username or password was incorrect');
    }

    let passwordCorrect = await user.validPassword(req.body.password);

    if(!passwordCorrect) {
        res.status(400).send('username or password was incorrect');
    }

    res.status(200).send(`sucessfully logged in as ${user.username}!`);
})

module.exports = {
    createUser,
    getUsers,
    loginUser,
}