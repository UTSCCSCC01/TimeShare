const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({

    post_label: {
        type: String,
        enum: ['1st-year', '2nd-year', '3rd-year', '4th-year'],
        required: [true, "This field can't be blank"]
    },

    // owner: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "User",
    //     required: [true, "A user ID is required to create a profile!"]
    // },

    post_id: {
        type: Number,
        // unique: true,
    },

    post_name: {
        type: String,
        unique: false,
        required: [true, "This field can't be blank"],
    },

    description: {
        type: String,
        unique: false,
    },

    timetable: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' },
});

mongoose.model('Post', PostSchema);