const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getSubcategoryPage = async (req, res, next) => {
    const id = req.params.id
    const categById = await categsFunctionals.findOneCateg({ id: id })

    if(categById) {
        const adByCategId = await adsFunctionals.findAdsWhere({ categoryId: id })
        res.render('subcategory', { user: req.user, categ: categById, ads: adByCategId })
    } else {
        const err = `There is no category with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getSubcategoryPage }