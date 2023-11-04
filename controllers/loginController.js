const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUser_login = (req, res) => {
    res.setHeader('Cache-Control', 'no-store'); // Disable caching
    const error = req.query.error;
    let errorMessage = '';

    if (error === 'invalid_credentials') {
        errorMessage = 'Incorrect email or password'; // Changed the error message
    }

    res.render('login', { title: 'login', error: errorMessage });
}


const postUser_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user._id; // Store user data in the session
            return res.redirect('/');
        }

        const errorMessage = 'Invalid Email or Password';
        res.render('login', { title: 'login', error: errorMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error: ${error.message}`);
    }
}



module.exports = {
    getUser_login,
    postUser_login,
}
