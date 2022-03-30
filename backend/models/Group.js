const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
        unique: true
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
        required: [true, "Must make group public or private!"]
    }
});


mongoose.model('Group', GroupSchema);