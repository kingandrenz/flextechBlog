const User = require('../models/user');
const flash = require('connect-flash');

module.exports.protec_user = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            // Set a flash message
            req.flash('error', 'Please login to create a post');
            return res.redirect('/');
        }
        next();
    } catch (err) {
        // Handle any errors that may occur during the database query
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};
