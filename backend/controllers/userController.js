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
            return new Error(`Error while saving to DB`);
        }
    })

    res.status(200).send('sucessfully created user')
})

// exports.create_user = async function(req, res) {
//     var userName = req.body.username;
//     var userEmail = req.body.email;
//     var password = req.body.password;


//     let existingUser = await User.findOne({email: userEmail});
//     if (existingUser) {
//         return res.status(400).send('That user already exists');
//     }

//     var newUser = new User({username: userName, email: userEmail});
//     newUser.setPassword(password);
//     newUser.save(function(err) {
//         if (err) {
//             return new Error(`Error while saving to DB`);
//         }
//     });
    
//     res.status(200).send('sucessfully created user');
// }

module.exports = {
    createUser
}