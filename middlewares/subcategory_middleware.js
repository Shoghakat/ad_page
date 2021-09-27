const { getSubcategoryByCategId } = require('./utilities/queries')

const getSubcategoryPage = (req, res, next) => {
    const categ = req.categ
    getSubcategoryByCategId(categ.id)
        .then(data => res.render('subcategory', { ads: data, categ: categ }) )
        .catch(next)
}

module.exports = { getSubcategoryPage }