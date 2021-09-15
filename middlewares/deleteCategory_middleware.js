const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')

const getDeleteCategoryPage = async (req, res, next) => {
    const categs = await categsFunctionals.findCategsWhere({ parentId: null })
    res.render('deleteCategory', { user: req.user, categs: categs })
}

const postDeleteCategoryPage = async (req, res, next) => {
    const categ = await categsFunctionals.findOneCateg({ name: req.body.name })
    const subcategsByParentId = await categsFunctionals.findOneCateg({ parentId: categ.id })

    if(subcategsByParentId) {
        req.flash('error_msg', 'Category cannot be deleted since it contains subcategories.')
        res.redirect('/delete/category')
    } else {
        await categsFunctionals.deleteCateg({ name: req.body.name })
        req.flash('success_msg', 'Category deleted successfully.')
        res.redirect('/account')
    }
}

module.exports = { getDeleteCategoryPage, postDeleteCategoryPage }