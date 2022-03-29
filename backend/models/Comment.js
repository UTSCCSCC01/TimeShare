const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({

    content: {
        type: String,
        unique: false,
    },

    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    time : { type : Date, default: Date.now }


});

mongoose.model('Comment', CommentSchema);