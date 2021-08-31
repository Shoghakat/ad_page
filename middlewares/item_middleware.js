const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getItemPage = async (req, res, next) => {
    const adById = await adsFunctionals.findAdById(req.params.id)
    
    if(adById) {
        const userById = await usersFunctionals.findUserById(adById.userId)
        res.render('item', { user: req.user, ad: adById, image: userById.image })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}

const getItemImagesPage = async (req, res, next) => {
    const adById = await adsFunctionals.findAdById(req.params.id)

    if(adById) {
        res.render('images', { user: req.user, ad: adById })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getItemPage, getItemImagesPage }