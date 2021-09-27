const validationFunction = (req, res, next, error, url) => {
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(url)
    }
    return next()
}

module.exports = { validationFunction }