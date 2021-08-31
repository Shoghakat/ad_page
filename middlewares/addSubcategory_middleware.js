const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getAddSubcategoryPage = async (req, res) => {
    const categs = await categsFunctionals.findCategsWhere({ parentId: null })
    res.render('addSubcategory', { user: req.user, categs: categs })
}

const postAddSubcategoryPage = async (req, res, next) => {
    const categ = await categsFunctionals.findOneCateg({ name: req.body.category })
    const subCateg = await categsFunctionals.findOneCateg({ name: req.body.name })
    
    if(subCateg) {
        req.flash('error_msg', 'Subcategory already exists.')
        res.redirect('/test/add/subcategory')
    } else {
        await categsFunctionals.createCateg({
            name: req.body.name,
            parentId: categ.id
        })
        req.flash('success_msg', 'Subcategory added successfully.')
        res.redirect('/test/account')
    }
}

module.exports = { getAddSubcategoryPage, postAddSubcategoryPage }