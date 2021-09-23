const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


const getDeleteCategoryPage = (req, res, next) => {
    categsFunctionals.findCategs()
        .then(categs => {
            return res.render('deleteCategory', { categs: categs })
        })
        .catch(next)
}


const deleteCateg = (req, res, next) => {
    const categ = req.categ
    categsFunctionals.deleteCateg({ id: categ.id })
        .then(() => {
            req.flash('success_msg', 'Category deleted successfully.')
            return res.redirect('/account')
        })
        .catch(next)
}


module.exports = {
    getDeleteCategoryPage,
    deleteCateg
}