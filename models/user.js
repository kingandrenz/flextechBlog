const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid emai address']
    },
    password: {
        type: String,
        required: [true, 'please enter a password']
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        if (error) {
            return next(error);
        }
        user.password = encrypted
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
