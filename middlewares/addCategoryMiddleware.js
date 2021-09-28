const { categsFunctionals } = require('../models/functionals/functionals')

const categFunctionals = new categsFunctionals.methods()

const getCreateCategoryPage = (req, res, next) => {
    categFunctionals.findCategsByParentId(null)
        .then(categs => res.render('addCategory', { categs: categs }))
        .catch(next)
}

const createCategory = (req, res, next) => {
    const data = {
        name: req.body.name,
        parentId: null
    }
    if(req.body.categ !== 'None') {
        data.parentId = req.body.categ
    }
    categFunctionals.createCateg(data)
        .then(() => next())
        .catch(next)
}

const completeCreateCateg = (req, res, next) => {
    req.flash('success_msg', 'Category added successfully.')
    return res.json({ message: 'Category added successfully' })
}

module.exports = {
    getCreateCategoryPage,
    createCategory,
    completeCreateCateg
}