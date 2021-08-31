const { Op } = require('sequelize')

const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getDeleteSubcategoryPage = async (req, res, next) => {
    const categs = await categsFunctionals.findCategsWhere({ parentId: { [Op.ne]: null } })
    res.render('deleteSubcategory', { user: req.user, categs: categs })
}

const postDeleteSubcategoryPage = async (req, res, next) => {
    const subcateg = await categsFunctionals.findOneCateg({ name: req.body.name })
    const adsByCategId = await adsFunctionals.findOneAd({ categoryId: subcateg.id })

    if(adsByCategId) {
        req.flash('error_msg', 'Subcategory cannot be deleted since it contains advertisements.')
        res.redirect('/test/delete/subcategory')
    } else {
        await categsFunctionals.deleteCateg({ name: req.body.name })
        req.flash('success_msg', 'Subcategory deleted successfully.')
        res.redirect('/test/account')
    }
}

module.exports = { getDeleteSubcategoryPage, postDeleteSubcategoryPage }