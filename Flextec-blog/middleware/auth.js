const User = require('../models/user');

module.exports.protec_user = (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if (err || !user) {
            return res.redirect('/');
        }
        next();
    });
};
