const { Op } = require('sequelize')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getAdsPage = async (req, res, next) => {
    const arr1 = await categsFunctionals.findCategsWhere({ parentId: null })
        .catch(next)

    const arr2 = await categsFunctionals.findCategsWhere({ parentId: { [Op.ne]: null } })
        .catch(next)
    
    res.render('ad', { main: arr1, subs: arr2, user: req.user })
}

const getAdsByIdPage = async (req, res, next) => {
    const categ = await categsFunctionals.findOneCateg({ id: req.params.id })
    if(categ) {
        res.render('advertisement', { categ: categ, user: req.user })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}

const postAdsByIdPage = async (req, res, next) => {
    const data = req.body
    data.userId = req.user.id,
    data.categoryId = req.params.id
    
    if(req.files.length > 0) {
        data.image = req.files.map(el => el.filename)
    }

    await adsFunctionals.createAd(data)

    req.flash('success_msg', 'Post published successfully.')
    res.redirect('/account')
}

module.exports = { getAdsPage, getAdsByIdPage, postAdsByIdPage }