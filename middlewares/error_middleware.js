const getErrorPage = async (req, res, next) => {
    res.render('error', { user: req.user })
}

module.exports = { getErrorPage }