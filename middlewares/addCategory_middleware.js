const categsFunctionals = require('../models/functionals/categories_functionals')
const categFunctionals = new categsFunctionals.methods()

const getCreateCategoryPage = (req, res, next) => {
    categFunctionals.findCategsWhere(null)
        .then(categs => res.render('addCategory', { categs: categs }))
        .catch(next)
}

const createCategory = (req, res, next) => {
    const data = {
        name: req.body.name,
        parentId: null
    }
    if(req.body.categId !== 'None') {
        data.parentId = req.body.categId
    }
    categFunctionals.createCateg(data)
        .then(() => next())
        .catch(next)
}

const completeCreateCateg = (req, res, next) => {
    req.flash('success_msg', 'Category added successfully.')
    return res.redirect('/ad')
}

module.exports = {
    getCreateCategoryPage,
    createCategory,
    completeCreateCateg
}