const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "A group with this name already exists!"],
        required: [true, "can't be blank"],
        
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,       
        unique: false,
        required: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    }
});

mongoose.model('Group', GroupSchema);
