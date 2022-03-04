const mongoose = require('mongoose');
var crypto = require('crypto');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "Field is required"], 
        match: [/^[a-zA-Z0-9]+$/, 'Username is taken'],
        unique: true,
        index: true,
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "Field is required"], 
        match: [/\S+@\S+\.\S+/, 'Email must be in a valid format e.g. name@email.ca']},
    hash: {
        type: String,
    },
    salt: String,
});


UserSchema.methods.validPassword = async function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex'); //random salt for each user
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}