const User = require('../models/user'); // Import your User model
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendResetPasswordEmail = require('../sendEmail_resetPass'); // Import the sendResetPasswordEmail function

// Function to render the forgot password form
const showForgotPasswordForm = (req, res) => {
    res.render('forgot-Password', { title: 'Forgot Password' });
};

// Function to process the forgot password form submission
const processForgotPasswordRequest = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            // Handle user not found
            return res.render('forgot-Password', { title: 'Forgot Password', errorMessage: 'User not found' });
        }

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send a password reset email with the reset link
        const resetLink = `${process.env.APP_URL}/blogs/users/reset-password/${resetToken}`;
        sendResetPasswordEmail(email, resetLink);

        // Render a success message or redirect to a confirmation page
        res.render('forgot-PasswordSuccess', { title: 'Forgot Password Success', email });
    } catch (error) {
        console.error(error);
        res.render('forgot-Password', { title: 'Forgot Password', errorMessage: 'Something went wrong' });
    }
};


// Function to render the reset password form
const showResetPasswordForm = (req, res) => {
    const token = req.params.token;
    res.render('reset-Password', { title: 'Reset Password', token });
};

// Function to process the reset password form submission
const processResetPasswordRequest = async (req, res) => {
    try {
        const token = req.params.token; // Retrieve the token from the URL
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            // Handle invalid or expired token
            return res.redirect('/blogs/users/forgot-password');
        }

        // Update the user's password
        const newPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        // Send a confirmation email with the password reset success message
        const email = user.email;
        const successMessage = 'Your password has been successfully reset.';
        sendResetPasswordEmail(email, successMessage);

        res.render('resetPasswordSuccess', { title: 'Password Reset Success' });
    } catch (error) {
        console.error(error);
        res.redirect('/blogs/users/forgot-password');
    }
};

module.exports = {
    showForgotPasswordForm,
    processForgotPasswordRequest,
    showResetPasswordForm,
    processResetPasswordRequest,
};
