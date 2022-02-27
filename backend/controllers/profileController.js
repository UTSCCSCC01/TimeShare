var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { where } = require('../models/Profile');
require('../models/Profile');
var Profile =  mongoose.model('Profile');

require('../models/User')
var User = mongoose.model('User');

const createProfile = asyncHandler(async (req, res, next) => {
    const { uid, first_name = "", last_name = "", program = "", year_of_study = "", phone = "", desc = "" } = req.body
    let profile = Profile({user: uid, first_name, last_name, program, year_of_study, phone, description: desc})
    e = await profile.validateSync()
    let errors = {}

    correspondingUser = await User.findOne({_id: uid})
    if(!correspondingUser){
        errors["user"] = ["User with given ID does not exist!"]
        res.status(404).json({validationErrors: errors})
        return
    }


    if(e){
        Object.keys(e.errors).map((key) => {
            if(key == "user"){
                errors["user"] = ["Bad user ID!"]
            }
            else{
                if(!errors[key]){
                    errors[key] = []
                }
                errors[key].push(e.errors[key].message)
            }
    })}


    dupUser = await Profile.findOne({user: uid})
    if(dupUser){
        if(errors["user"]){
            errors["user"].push("User can only have one profile!")
        }
        else{
            errors["user"] = ["User can only have one profile!"]
        }
    }

    if(Object.keys(errors).length > 0){
        res.status(400).json({validationErrors: errors})
    }
    else{
        profile = await profile.save()
        res.status(201).json(profile)
    }
})

const getProfiles = asyncHandler(async (req, res, next) => {
    let query = Profile.find({})
    // var query =  Profile.find({}).populate({path: "user", select: 'username email'})
    query.exec().then(function (profiles){
        profiles = req.params.userName ? profiles.find(profile => profile.user.username == req.params.userName) : profiles
        res.status(200).json(profiles)
     }).catch(function (err){
        next(err)
     })
    })

const deleteProfiles = asyncHandler( async (req, res, next) => {
    let query = req.params.profileId ? Profile.deleteOne({_id: req.params.profileId}) : Profile.deleteMany() 
    query.exec().then(function (delCount){
        res.status(200).json(delCount)
    })
    .catch(function (err){
        next(err)
    })
})

const updateProfile = asyncHandler( async (req, res, next) => {
    const { pid, first_name, last_name, program, year_of_study, phone, desc } = req.body
    let profile = await Profile.findOne({_id: pid})

    let errors = {}
    if(!profile){
        errors["profile"] = ["Profile with given ID does not exist"]
        res.status(404).json(errors)
        return
    }

    profile.first_name = first_name
    profile.last_name = last_name
    profile.program = program
    profile.year_of_study = year_of_study
    profile.phone = phone
    profile.description = desc

    let e = await profile.validateSync()

    if(e){
        Object.keys(e.errors).map((key) => {
            if(!errors[key]){
                errors[key] = []
            }
            errors[key].push(e.errors[key].message)
        })
    }

    if(Object.keys(errors).length > 0){
        res.status(400).json({validationErrors: errors})
    }
    else{
        profile = await profile.save()
        res.status(201).json(profile)
    }
    
})

module.exports = {
    createProfile,
    getProfiles,
    deleteProfiles,
    updateProfile
}