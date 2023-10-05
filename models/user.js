const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        if (error) {
            return next(error);
        }
        user.password = encrypted;
        next();
    });
});

// Generate a password reset token and set its expiration date
UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
