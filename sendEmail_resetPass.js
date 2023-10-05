// Import the Nodemailer library
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log(process.env.EMAIL_SERVICE);
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


// Create a function to send a password reset email
const sendPasswordResetEmail = (email, resetLink) => {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email address stored in an environment variable
            pass: process.env.EMAIL_PASS  // Your email password stored in an environment variable
        }
    });

    // Define the email data for password reset
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: email, // Recipient's email address (the user who requested the password reset)
        subject: 'Password Reset', // Email subject
        html: `
            <p>Hello,</p>
            <p>You have requested a password reset. Click the following link to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
        ` // HTML content with a password reset link
    };

    // Send the password reset email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Password reset email could not be sent:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};

// Export the sendPasswordResetEmail function
module.exports = sendPasswordResetEmail;
