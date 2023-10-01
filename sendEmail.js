// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a function to send an email
const sendEmail = (name, email, phone, message) => {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
        auth: {
            user: 'kanuchibueze@gmail.com', // Your email address
            pass: 'aka2ba5ka1' // Your email password
        }
    });

    // Define the email data
    const mailOptions = {
        from: 'your_email@example.com', // Sender's email address
        to: 'recipient@example.com', // Recipient's email address
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
