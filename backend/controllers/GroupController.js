var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
require('../models/Group');
var Group =  mongoose.model('Group');

require('../models/User')
var User = mongoose.model('User');

const createGroup = asyncHandler(async (req, res, next) => {
    let errors = {}
    const { name, description = "" } = req.body
    let users = []
    let owner = req.user._id
    
    let group = Group({name, description, users, owner, type: "public"})

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

module.exports = {
    createGroup,
    updateGroup,
    getGroup
}