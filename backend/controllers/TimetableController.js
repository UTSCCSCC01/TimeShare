var mongoose = require('mongoose');
require('../models/Timetable');
// require('../models/Tutorial');
// require('../models/Lecture');
// require('../models/Course');
// var Tutorial = mongoose.model('Tutorial');
// var Lecture = mongoose.model('Lecture')
// var Course = mongoose.model('Course');

var Timetable = mongoose.model('Timetable');

exports.create_timetable = async function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    // Create an empty timtable
    let existingTable = await Timetable.findOne({timetable_name: name, timetable_id: id, courses: [], lectures: [], tutorials: []});
    if (existingTable) {
        return res.status(400).send('That user already exists');
    }



    // var newTimetable = new Timetable({timetable_name: name, courses: [], lectures: [], tutorials: [], timetable_id: 0});
    var newTimetable = new Timetable({timetable_name: name, timetable_id: id});
    
    // Make sure u pass in all values, 
    newTimetable.save(function(err) {
        if (err) {
            return new Error(`Error while saving to DB`);
        }
    });
    // IDs will need to be uniquely generated ^

    res.status(200).send(name);
    // For now just send back 200
}

