const { Op } = require('sequelize')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getDeleteSubcategoryPage = async (req, res, next) => {
    const categs = await categsFunctionals.findCategsWhere({ parentId: { [Op.ne]: null } })
    res.render('deleteSubcategory', { user: req.user, categs: categs })
}

const postDeleteSubcategoryPage = async (req, res, next) => {
    const subcateg = await categsFunctionals.findOneCateg({ name: req.body.name })
    const adsByCategId = await adsFunctionals.findOneAd({ categoryId: subcateg.id })

    if(adsByCategId) {
        req.flash('error_msg', 'Subcategory cannot be deleted since it contains advertisements.')
        res.redirect('/delete/subcategory')
    } else {
        await categsFunctionals.deleteCateg({ name: req.body.name })
        req.flash('success_msg', 'Subcategory deleted successfully.')
        res.redirect('/account')
    }
}

module.exports = { getDeleteSubcategoryPage, postDeleteSubcategoryPage }