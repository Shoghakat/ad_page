const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const Promise = require('bluebird')

const getItemPage = (req, res, next) => {
    const ad = req.ad
    adsImagesFunctionals.findImagesWhere({ adId: ad.id })
        .then(images => {
            usersFunctionals.findOneUser({ id: ad.userId })
                .then(adUser => {
                    return res.render('item', { ad: ad, images: images, adUser: adUser })
                })
        })
        .catch(next)
}

const postItemPage = (req, res, next) => {
    const ad = req.ad
    if(req.files.length === 0) {
        return res.redirect(`/item/${ad.id}`)
    }
    return next()
}

const createImagesByAdId = (req, res, next) => {
    const ad = req.ad
    return Promise.each(req.files, el => {
        return adsImagesFunctionals.createImage({
            filename: el.filename,
            path: el.path,
            adId: ad.id
        })
    })
        .then(() => {
            req.flash('success_msg', 'File/s saved successfully.')
            return res.redirect(`/item/${ad.id}`)
        })
        .catch(next)
}

module.exports = {
    getItemPage,
    postItemPage,
    createImagesByAdId
}