const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getAddCategoryPage = (req, res) => {
    res.render('addCategory', { user: req.user })
}

const postAddCategoryPage = async (req, res, next) => {
    const categ = await categsFunctionals.findOneCateg({ name: req.body.name })
    if(categ) {
        req.flash('error_msg', 'Category already exists.')
        res.redirect('/add/category')
    } else {
        await categsFunctionals.createCateg({ name: req.body.name })
        req.flash('success_msg', 'Category added successfully.')
        res.redirect('/account')
    }
}

module.exports = { getAddCategoryPage, postAddCategoryPage }