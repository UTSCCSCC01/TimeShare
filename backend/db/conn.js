const { MongoClient } = require("mongodb");
const Db = 'mongodb+srv://TimeShare:3NRiikZNdo9xm6ci@cluster0.4kjn4.mongodb.net/dev-pub-data?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connect(Db, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var _db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
_db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 
module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db)
        {
            _db = db.db("myFirstDatabase");
            console.log("Successfully connected to MongoDB."); 
        }
        return callback(err);
            });
    },
    
    getDb: function () {
        return _db;
    },
};