const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getCreateCategoryPage = (req, res, next) => {
    categsFunctionals.findCategsWhere({ parentId: null })
        .then(categs => res.render('addCategory', { categs: categs }))
        .catch(next)
}

const createCategory = (req, res, next) => {
    categsFunctionals.findOneCateg({ name: req.body.name })
        .then(categ => {
            if(categ) {
                req.flash('error_msg', 'Category already exists.')
                return res.redirect('/add/category')
            }

            if(req.body.category === 'None') {
                categsFunctionals.createCateg({ name: req.body.name })
            } else {
                categsFunctionals.findOneCateg({ name: req.body.category })
                    .then(parentCateg => {
                        categsFunctionals.createCateg({
                            name: req.body.name,
                            parentId: parentCateg.id
                        })
                    })
            }
        })
        .then(() => {
            req.flash('success_msg', 'Category added successfully.')
            return res.redirect('/account')
        })
        .catch(next)
}

module.exports = { getCreateCategoryPage, createCategory }