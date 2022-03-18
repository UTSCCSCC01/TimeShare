var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { where } = require('../models/Profile');
require('../models/Profile');
var Profile =  mongoose.model('Profile');

require('../models/User')
var User = mongoose.model('User');

const createProfile = asyncHandler(async (req, res, next) => {
    const { uid, first_name = "", last_name = "", program = "", year_of_study = "", phone = "", desc = "", avatar = "" } = req.body

    let profile = Profile({user: uid, first_name, last_name, program, year_of_study, phone, description: desc, avatar})
    e = await profile.validateSync()
    let errors = {}

    correspondingUser = await User.findOne({_id: uid})
    if(!correspondingUser){
        errors["user"] = ["User with given ID does not exist!"]
        res.status(404).json({errors: errors})
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
        res.status(400).json({errors: errors})
    }
    else{
        profile = await profile.save()
        res.status(201).json(profile)
    }
})

const getProfiles = asyncHandler(async (req, res, next) => {
    let errors = {"errors": {}}
    let state = null
    const { username } = req.params
    if(req._parsedUrl.path === '/'){
        state = "self-view"
    }

    if(!state){
        user = await User.findOne({username})
        if(!user){
            errors.errors["user"] = ["User with given username doesn't exist!"]
            return res.status(404).json(errors)
        }
    }


    let profile = null
    profile = state != "self-view" ? await Profile.findOne({user: user._id}).populate('groups').populate('posts') : await Profile.findOne({user: req.user._id}).populate('groups').populate('posts')
    
    if(!profile){
        errors.errors["profile"] = ["Profile with given ID doesn't exist!"]
        return res.status(404).json(errors)
    }

    let {groups, ...data} = profile._doc
    data['public_groups'] = []
    data['public_groups'] = groups.filter((group) => group.type === "public")

    if(!state){
        return res.status(200).json(data)
    }

    data['private_groups'] = []
    data['private_groups'] = groups.filter((group) => group.type === "private")

    return res.status(200).json(data)
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
    const { first_name, last_name, program, year_of_study, phone, description } = req.body
    let profile = await Profile.findOne({user: req.user._id})

    let errors = {}
    if(!profile){
        errors["profile"] = ["Profile with given ID does not exist"]
        return res.status(404).json(errors)
    }
    
    profile.first_name = first_name || profile.first_name
    profile.last_name = last_name || profile.last_name
    profile.program = program || profile.program
    profile.year_of_study = year_of_study || profile.year_of_study
    profile.phone = phone || profile.phone
    profile.description = description || profile.description

    let avatar, avatarURL
    if(req.files && req.files.avatar){
        avatar = req.files.avatar
        avatarURL = "static/users/" + req.user.username + "/" + avatar.name
        profile.avatar = avatarURL
    }
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
        res.status(400).json({errors: errors})
    }
    else{
        profile = await profile.save()
        avatar && avatar.mv(avatarURL)
        res.status(201).json(profile)
    }
    
})

const updateAvatar = asyncHandler( async (req, res, next) => {
    if(!req.files || !req.files.avatar) {
        return res.status(400).json({errors: {'avatar': ['avatar not uploaded!']}})
    }

    let avatar = req.files.avatar
    const url = "static/users/" + req.user.username + "/" + avatar.name
    avatar.mv(url)

    profile = await Profile.findOne({user: req.user._id})
    profile.avatar = url
    await profile.save()

    res.status(200).send({
        data: {
            name: avatar.name,
            mimetype: avatar.mimetpye,
            size: avatar.size
        }
    })
})
module.exports = {
    createProfile,
    getProfiles,
    deleteProfiles,
    updateProfile,
    updateAvatar
}