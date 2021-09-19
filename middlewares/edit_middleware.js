const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getEditAdPage = (req, res, next) => {
    const ad = req.ad
    adsImagesFunctionals.findImagesWhere({ adId: ad.id })
        .then(data => {
            return res.render('edit', { ad: ad, images: data })
        })
        .catch(next)
}


const updateAd = (req, res, next) => {
    const ad = req.ad
    adsFunctionals.updateAd(req.body, { id: ad.id })
        .then(() => {
            req.flash('success_msg', 'Post updated successfully.')
            return res.redirect(`/item/${ad.id}`)
        }) 
        .catch(next)   
}

module.exports = {
    getEditAdPage,
    updateAd
}