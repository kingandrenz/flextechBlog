const User = require('../models/user');

const register_user = (req, res) => {
    res.render('register', {title: 'User Registration'});
}

const store_user = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (err) {
        return res.redirect('/users/register');
    }
}

module.exports = {
    register_user,
    store_user,
}
