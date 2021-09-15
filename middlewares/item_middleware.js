const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')

const getItemPage = async (req, res, next) => {
    const adById = await adsFunctionals.findOneAd({ id: req.params.id })
    
    if(adById) {
        const userById = await usersFunctionals.findOneUser({ id: adById.userId })
        res.render('item', { user: req.user, ad: adById, image: userById.image })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}

const getItemImagesPage = async (req, res, next) => {
    const adById = await adsFunctionals.findOneAd({ id: req.params.id })

    if(adById) {
        res.render('images', { user: req.user, ad: adById })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getItemPage, getItemImagesPage }