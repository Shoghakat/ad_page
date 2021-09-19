const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const Promise = require('bluebird')
const { ConnectionClosedEvent } = require('mongodb')

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


const createImagesByAdId = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    return Promise.each(req.files, el => {
        return adsImagesFunctionals.createImage({
            filename: el.filename,
            path: el.path,
            adId: id
        })
    })
        .then(() => {
            req.flash('success_msg', 'File/s saved successfully.')
            return res.redirect(`/item/${id}`)
        })
        .catch(next)
}

module.exports = { getItemPage, createImagesByAdId }