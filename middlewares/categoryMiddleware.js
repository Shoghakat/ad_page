const { getAdsByCategId } = require('./utilities/queries')

const getAdsByCategoryPage = (req, res, next) => {
    const categ = req.categ
    getAdsByCategId(categ.id)
        .then(data => res.render('category', { ads: data, categ: categ }))
        .catch(next)
}

module.exports = { getAdsByCategoryPage }