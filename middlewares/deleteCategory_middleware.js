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


const checkCateg = (req, res, next) => {
    categsFunctionals.findOneCateg({ name: req.body.name })
        .then(categ => {
            if(!categ) {
                req.flash(`error_msg', 'There is no category with name ${req.body.name}.`)
                return res.redirect('/delete/category')
            }

            req.categ = categ
            return next()
        })
}


const checkHasChildCateg = (req, res, next) => {
    const categ = req.categ
    
    if(categ.parentId) {
        return next()
    }

    categsFunctionals.findOneCateg({ parentId: categ.id })
        .then(subcateg => {
            if(!subcateg) {
                return next()
            }

            req.flash('error_msg', 'Category cannot be deleted since it contains subcategories.')
            return res.redirect('/delete/category')
        })
        .catch(next)
}


const checkHasAd = (req, res, next) => {
    const categ = req.categ

    if(!categ.parentId) {
        return next()
    }

    adsFunctionals.findOneAd({ categoryId: categ.id })
        .then(ad => {
            if(!ad) {
                return next()
            }

            req.flash('error_msg', 'Subcategory cannot be deleted since it contains advertisements.')
            return res.redirect('/delete/category')
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
    checkCateg,
    checkHasChildCateg,
    checkHasAd,
    deleteCateg
}