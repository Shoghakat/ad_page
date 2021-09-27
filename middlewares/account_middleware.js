const { getUserAdsAndImageById } = require('./utilities/queries')

const getAccountPage = (req, res, next) => {
    getUserAdsAndImageById(req.user.id)
        .then(data => res.render('account', { ads: data }))
        .catch(next)
}

module.exports = { getAccountPage }