var mongoose = require('mongoose');
require('../models/User');
var User = mongoose.model('User');


exports.create_user = async function(req, res) {
    var userName = req.body.username;
    var userEmail = req.body.email;
    var password = req.body.password;


    let existingUser = await User.findOne({email: userEmail});
    if (existingUser) {
        return res.status(400).send('That user already exists');
    }

    var newUser = new User({username: userName, email: userEmail});
    newUser.setPassword(password);
    newUser.save(function(err) {
        if (err) {
            return new Error(`Error while saving to DB`);
        }
    });
    
    res.status(200).send('sucessfully created user');
}