const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

// Profile image stored under _id.jpg where _id is the id of the object (user / group)
const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: [true, "A user ID is required to create a profile!"]
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    program: {
        type: String,
        required: false
    },
    year_of_study: {
        type: Number,
        min: 1,
        max: 10,
        required: false
    },
    phone: {
        type: String,
        match: [/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Phone number format is wrong"]
    },
    description: {
        type: String,
        maxLength: 160
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    avatar: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);