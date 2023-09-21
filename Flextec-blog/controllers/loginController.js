const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUser_login = (req, res) => {
    res.setHeader('Cache-Control', 'no-store'); // Disable caching
    res.render('login', { title:'login', error: req.query.error });
}

const postUser_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Try to find the user using a Promise
        const user = await User.findOne({ email });
        

        if (user) {
            console.log('email found');
            // User found, compare passwords
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                console.log(`${match}`);
                // Passwords match, store user in session
                req.session.userId = user._id; // Store user data in the session
                return res.redirect('/');
            }
        }

        // If user not found or passwords don't match, redirect with an error
        return res.redirect('/users/login?error=invalid_credentials');
    } catch (error) {
        // Handle any errors here
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getUser_login,
    postUser_login,
}
