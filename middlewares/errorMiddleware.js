const getErrorPage = (req, res, next) => {
    res.render('error')
}

module.exports = { getErrorPage }