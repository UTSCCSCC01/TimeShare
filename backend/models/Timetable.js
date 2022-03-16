const mongoose = require('mongoose');


const TimetableSchema = mongoose.Schema({

    timetable_id: {
        type: Number,
    },

    timetable_name: {
        type: String,
        unique: false,
        required: [true, "can't be blank"],
        sparse: true,
    },
    courses: [{
        type: String,
        lowercase: false, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[A-Z]{3}([1-4]|[A-D])\d{2}(H|Y)(1|3|5)(F|S)$/, 'is invalid'],
    }],
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }], 
    tutorials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
});

mongoose.model('Timetable', TimetableSchema);