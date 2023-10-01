module.exports = (req, res, next) => {
    if (!req.files.image || !req.body.username || !req.body.title || !req.body.snippet || !req.body.body) {
        return res.redirect('/blogs/create')
    }

    next()
}