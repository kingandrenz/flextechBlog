const User = require('../models/user');

const register_user = (req, res) => {
    const registrationErrors = req.flash('error'); // Get the error flash messages
    res.render('register', {title: 'User Registration', registrationErrors});
}

const store_user = async (req, res) => {
    try {
        const user = await User.create(req.body);
        req.flash('success', 'User registered successfully');
        res.redirect('/');
    } catch (err) {
        req.flash('error', 'User registration failed');
        return res.redirect('/users/register');
    }
}

module.exports = {
    register_user,
    store_user,
}
