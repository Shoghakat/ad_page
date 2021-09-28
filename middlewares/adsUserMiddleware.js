const { getUserAdsById } = require('./utilities/queries')

const getUserAdsPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    getUserAdsById(id)
        .then(data => {
            return res.render('userAds', {
                ads: data,
                owner: {
                    id: data[0].userId,
                    name: data[0].name
                }
            })
        })
        .catch(next)
}

module.exports = { getUserAdsPage }