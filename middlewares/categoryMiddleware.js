const { getAdsByCategId } = require('./utilities/queries')

const getAdsByCategoryPage = (req, res, next) => {
    const limit = 2
    let page = 1
    if(req.query.page) {
        page = parseInt(req.query.page, 10)
    }
    const offset = (page - 1) * limit

    const categ = req.categ
    getAdsByCategId(categ.id, limit, offset)
        .then(ads => {
            res.render('category', { ads, categ })
        })
        .catch(next)
}

module.exports = { getAdsByCategoryPage }