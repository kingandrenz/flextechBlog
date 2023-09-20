const User = require('../models/user');

//Preventing Authenticated Users From Visiting Register or Login Pages
module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')
    }

    next()
}