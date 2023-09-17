const bcrypt = require('bcrypt');
const User = require('../models/user');


const getUser_login = (req, res) => {
    res.render('login');
}

const postUser_login = (req, res) => {
    const { email, password } = req.body;
    
    // Try to find the user
    User.findOne({ email }, (error, user) => {
        // ... (same code as in the previous response)

        if (same) {
            // Passwords match, store user in session
            req.session.userId = user._id; // Store user data in the session
            return res.redirect('/');
        } else {
            // Passwords do not match
            // Redirect to the login page with an error message
            return res.redirect('/users/login?error=invalid_credentials');
        }
    });
}
module.exports = {
    getUser_login,
    postUser_login,
}