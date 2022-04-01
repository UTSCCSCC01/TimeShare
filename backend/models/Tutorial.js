const mongoose = require('mongoose');

const TutorialSchema = mongoose.Schema({
    course_id: {
        type: String,
        required: [true, "can't be blank"], 
        // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        match: [/^[A-Z]{3}([1-4]|[A-D])\d{2}(H|Y)(1|3|5)(F|S)$/, 'is invalid'],
    },
    tutorial_id: {
        type: String,
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },

    time: {
        day: {
            type: String, 
            lowercase: true, 
            unique: false, 
            required: [true, "can't be blank"], 
            match: [/(Monday|Tuesday|Wednesday|Thursday|Friday)/, 'is invalid'], index: true},
        start_time: {
            type: Number, 
            unique: false, 
            required: [true, "can't be blank"], 
            match: [/0[0-9]|1[0-9]|2[0-3]]/, 'is invalid'], index: true},
        end_time: {
            type: Number, 
            unique: false, 
            required: [true, "can't be blank"], 
            match:[/0[0-9]|1[0-9]|2[0-3]]/, 'is invalid'], index: true}}

});

mongoose.model('Tutorial', TutorialSchema);