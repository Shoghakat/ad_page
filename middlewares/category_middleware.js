const { Op } = require('sequelize')

const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getCategoryPage = async (req, res, next) => {
    const id = req.params.id

    const subcategsByParentId = await categsFunctionals.findCategsWhere({ parentId: id })
    const ids = subcategsByParentId.map(el => el.id)
    const adsByIds = await adsFunctionals.findAdsWhere({ categoryId: { [Op.or]: ids } })

    const categ = await categsFunctionals.findCategById(id)

    if(categ) {
        res.render('category', { user: req.user, categ: categ, ads: adsByIds })
    } else {
        const err = `There is no category with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getCategoryPage }