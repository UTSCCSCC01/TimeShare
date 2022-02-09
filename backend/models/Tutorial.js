const mongoose = require('mongoose');

const TutorialSchema = mongoose.Schema({
    tutorial_id: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        unique: true,
        index: true,
    },
    start_time: {
        type: Number, 
        unique: false, 
        required: [true, "can't be blank"], 
        match: [/0[0-9]|1[0-9]|2[0-3]]/, 'is invalid'], index: true},
    end_time: {
        type: Number, 
        unique: false, 
        required: [true, "can't be blank"], 
        match:[/0[0-9]|1[0-9]|2[0-3]]/, 'is invalid'], index: true},
    day: {
        type: String, 
        lowercase: true, 
        unique: false, 
        required: [true, "can't be blank"], 
        match: [/(Monday|Tuesday|Wednesday|Thursday|Friday)/, 'is invalid'], index: true} //fix
});

mongoose.model('Tutorial', TutorialSchema);
