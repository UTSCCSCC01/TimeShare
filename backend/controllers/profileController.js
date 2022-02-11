var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { where } = require('../models/Profile');
require('../models/Profile');
var Profile =  mongoose.model('Profile');

const createProfile = asyncHandler(async (req, res, next) => {
    const { uid, name, phone, desc } = req.body
    Profile.findOne({user: uid}).exec().then(function (dupUser){
        if(dupUser){
            throw new Error("A user can only have one Profile!")
        }
        else{
            return 1
        }
    })
    .then(function (bool) {
        return Profile.create({user: uid, name: name, phone: phone, description: desc} )
    })
    .then(function (newUser) {
        console.log(newUser)
        res.status(201).json(newUser)
    })
    .catch(function (err){
        next(err)
    })
})

const getProfiles = asyncHandler(async (req, res, next) => {
    let query = Profile.find({}).populate({path: "user", select: 'username email'})
    // var query =  Profile.find({}).populate('User')
    query.exec().then(function (profiles){
        profiles = req.params.userName ? profiles.find(profile => profile.user.username == req.params.userName) : profiles
        res.status(200).json(profiles)
     }).catch(function (err){
        next(err)
     })}
)

const deleteProfiles = asyncHandler( async (req, res, next) => {
    let query = req.params.profileId ? Profile.deleteOne({_id: req.params.profileId}) : Profile.deleteMany() 
    query.exec().then(function (delCount){
        res.status(200).json(delCount)
    })
    .catch(function (err){
        next(err)
    })
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
    createProfile,
    getProfiles,
    deleteProfiles
}