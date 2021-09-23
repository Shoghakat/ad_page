const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getCreateCategoryPage = (req, res, next) => {
    categsFunctionals.findCategsWhere({ parentId: null })
        .then(categs => res.render('addCategory', { categs: categs }))
        .catch(next)
}

const createCategory = (req, res, next) => {
    if(req.body.categId === 'None') {
        categsFunctionals.createCateg({ name: req.body.name })
            .then(() => next())
            .catch(next)
    } else {
        categsFunctionals.findOneCateg({ id: req.body.categId })
            .then(parentCateg => {
                categsFunctionals.createCateg({
                    name: req.body.name,
                    parentId: parentCateg.id
                })
            })
            .then(() => next())
            .catch(next)
    }
}

const completeCreateCateg = (req, res, next) => {
    req.flash('success_msg', 'Category added successfully.')
    return res.redirect('/account')
}

module.exports = {
    getCreateCategoryPage,
    createCategory,
    completeCreateCateg
}