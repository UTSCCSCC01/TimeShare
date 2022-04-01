const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    course_name: {
        type: String,
        unique: false,
        required: [true, "can't be blank"],
        
    },
    course_id: {
        type: String,
        uppercase: false,
        unique: true, // Ex CSC301H5
        required: [true, "can't be blank"],
        // double check later on
        // match: [/^[A-Z]{3}([1-4]|[A-D])\d{2}(H|Y)(1|3|5)(F|S)$/, 'is invalid'], // Finish later
    }, 
    description: {
        type: String,       
        unique: false,
        required: [true, "can't be blank"],
    },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
    tutorials: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
    
});

mongoose.model('Course', CourseSchema);
