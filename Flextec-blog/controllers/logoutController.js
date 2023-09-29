// controllers/logoutController.js
module.exports.logout_get = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
