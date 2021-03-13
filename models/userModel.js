const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength:[4, 'Password should be at least 4 characters']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;