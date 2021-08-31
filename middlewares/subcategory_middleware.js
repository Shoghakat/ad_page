const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getSubcategoryPage = async (req, res, next) => {
    const id = req.params.id
    const categById = await categsFunctionals.findCategById(id)

    if(categById) {
        const adByCategId = await adsFunctionals.findAdsWhere({ categoryId: id })
        res.render('subcategory', { categ: categById, ads: adByCategId })
    } else {
        const err = `There is no category with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getSubcategoryPage }