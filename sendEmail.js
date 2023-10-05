// Import the Nodemailer library
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a function to send an email
const sendEmail = (name, email, phone, message) => {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email address stored in an environment variable
            pass: process.env.EMAIL_PASSWORD // Your email password stored in an environment variable
        }
    });

    // Enable debugging for the transporter
    transporter.debug = true;


    // Define the email data
    const mailOptions = {
        from: 'kanuchibueze@gmail.com', // Sender's email address
        to: 'andrewandrenzanthony@gmail.com', // Recipient's email address
        subject: 'New Contact Form Submission', // Email subject
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        ` // Email content
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email could not be sent:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Export the sendEmail function
module.exports = sendEmail;
