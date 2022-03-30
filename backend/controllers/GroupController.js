var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
require('../models/Group');
var Group =  mongoose.model('Group');
require('../models/Profile');
var Profile =  mongoose.model('Profile');
var Post = mongoose.model('Post');

require('../models/User')
var User = mongoose.model('User');

const createGroup = asyncHandler(async (req, res, next) => {
    let errors = {}
    let { name, description = "", type } = req.body

    let users = [req.user._id]
    let owner = req.user._id
    type = type ? type : "public"
    let group = Group({name, description, users, owner, type})
    let profile = await Profile.findOne({user: req.user._id})

    let image, image_url = ""
    if(req.files && req.files.image){
        image = req.files.image
        image_url = "static/groups/" + name + "/image/" + image.name
    }
    group.image = image_url

    
    e = await group.validateSync()
    
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
        })
        return res.status(400).json({errors: errors})
    }
    
    if(image){
        image.mv(image_url)
    }
    group = await group.save()
    profile.groups.push(group._id)
    await profile.save()
    
    return res.status(201).json(group)
})

const getGroup = asyncHandler(async (req, res, next) => {
    let errors = {"errors": {}}
    const { name } = req.params
    let group = await Group.findOne({name})

    if(!group){
        errors.errors["Group"] = ["Group with given name doesn't exist!"]
        return res.status(404).json(errors)
    }

    return res.status(200).json(group)
})

const updateGroup = asyncHandler( async (req, res, next) => {
    const { name, description } = req.body
    let errors = {"errors": {}}
    
    let group = await Group.findOne({name})
    if(!group){
        errors.errors["group"] = ["Group with given name doesn't exist!"]
        return res.status(404).json(errors)
    }

    if(group.owner != req.user._id){
        errors.errors["user"] = ["User is not the owner of the group!"]
        return res.status(403).json(errors)
    }

    let image, image_url
    if(req.files && req.files.image){
        image = req.files.image
        image_url = "static/groups/" + name + "/image/" + image.name
        group.image = image
    }

    group.description = description || group.description
    group.image = image_url || group.image

    let e = await group.validateSync()

    if(e){
        Object.keys(e.errors).map((key) => {
            if(!errors[key]){
                errors[key] = []
            }
            errors[key].push(e.errors[key].message)
        })
        return res.status(400).json({errors: errors})
    }

    if(image){
        image.mv(image_url)
    }
    group = await group.save()
    res.status(201).json(group)
    
})

const joinGroup = asyncHandler( async (req, res, next) => {

    console.log('herefewfewfwe');
    const { group_id } = req.body
    let errors = {"errors": {}}
    console.log(group_id);

    let group = await Group.findOne({_id: group_id})
    if(!group){
        errors.errors["group"] = ["Group with given name doesn't exist!"]
        return res.status(404).json(errors)
    }

    let profile = await Profile.findOne({user: req.user._id})
    
    profile.groups.addToSet(group._id)
    group.users.addToSet(req.user._id)
    profile = await profile.save()
    group = await group.save()
    return res.status(201).json(profile)
    
})

const viewGroup = asyncHandler(async (req, res, next) => {
    let errors = {"errors": {}}
    const { group_id } = req.params
    let group = await Group.findOne({_id: group_id})

    if(!group){
        errors.errors["Group"] = ["Group with given name doesn't exist!"]
        return res.status(404).json(errors)
    }

    let users = group.users;
    let posts = [];
    let userObjs = [];
    for(let i = 0; i < users.length; i++) {
        let post = await Post.findOne({owner: users[i]})
        posts.push(post)
        let user = await User.findOne({_id: users[i]})
        let profile = await Profile.findOne({user: users[i]})
        userObjs.push({
            username: user.username,
            profile: profile,
        })
    }
    
    return res.status(200).json({
        users: userObjs,
        posts: posts,
        group: group,
    })
})

module.exports = {
    createGroup,
    updateGroup,
    getGroup,
    joinGroup,
    viewGroup,
}