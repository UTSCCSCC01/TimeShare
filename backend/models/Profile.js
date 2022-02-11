const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

// Profile image stored under _id.jpg where _id is the id of the object (user / group)
const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: [true, "A user ID is required to create a profile!"]
    },
    name: {
        type: String,
        required: [true, "Name cannot be blank!"],
        match: [/^[a-zA-Z]+ ([a-zA-Z]+ )*/, "Name format is wrong"]
    },
    phone: {
        type: String
        // match: [/^(+\d{1,2}\s)?(?\d{3})?[\s.-]\d{3}[\s.-]\d{4}$/, "Phone number format is wrong"]
    },
    description: {
        type: String,
        maxLength: 160
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);