const { Op } = require('sequelize')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getCategoryPage = async (req, res, next) => {
    const id = req.params.id

    const subcategsByParentId = await categsFunctionals.findCategsWhere({ parentId: id })
    const ids = subcategsByParentId.map(el => el.id)
    const adsByIds = await adsFunctionals.findAdsWhere({ categoryId: { [Op.or]: ids } })

    const categ = await categsFunctionals.findOneCateg({ id: id })

    if(categ) {
        res.render('category', { user: req.user, categ: categ, ads: adsByIds })
    } else {
        const err = `There is no category with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getCategoryPage }