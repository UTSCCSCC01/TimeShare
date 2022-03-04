const mongoose = require('mongoose');
var crypto = require('crypto');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        unique: true,
        index: true,
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    hash: {
        type: String,
        required: [true, "Password cannot be blank"],
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