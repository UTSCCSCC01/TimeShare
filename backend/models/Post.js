const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({

    post_id: {
        type: Number,
        unique: true,
    },

    post_name: {
        type: String,
        unique: false,
        required: [true, "can't be blank"],
    },

    description: {
        type: String,
        unique: false,
    },

    timetable: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' },
});

mongoose.model('Post', PostSchema);