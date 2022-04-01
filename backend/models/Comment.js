const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({

    content: {
        type: String,
        unique: false,
    },

    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

    commenter: {
        type: String,
        unique: false,
    },

    time : { type : Date, default: Date.now }


});

mongoose.model('Comment', CommentSchema);