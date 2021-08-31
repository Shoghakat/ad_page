const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getAddCategoryPage = (req, res) => {
    res.render('addCategory', { user: req.user })
}

const postAddCategoryPage = async (req, res, next) => {
    const categ = await categsFunctionals.findOneCateg({ name: req.body.name })
    if(categ) {
        req.flash('error_msg', 'Category already exists.')
        res.redirect('/test/add/category')
    } else {
        await categsFunctionals.createCateg({ name: req.body.name })
        req.flash('success_msg', 'Category added successfully.')
        res.redirect('/test/account')
    }
}

module.exports = { getAddCategoryPage, postAddCategoryPage }