const fs = require('fs/promises')
const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const removeImage = (image, cb) => {
    fs.unlink(image)
        .then(cb)
        .catch(cb)
}

const removeAdImage = (req, res, next) => {
    const image = req.image.path
    removeImage(image, next)
}

const removeAdImages = (req, res, next) => {
    const ad = req.ad
    adsImagesFunctionals.findImagesWhere({ adId: ad.id })
        .then(images => {
            return Promise.each(images, el => fs.unlink(el.path) )
        })
        .then(() => next())
        .catch(() => next())
}

const removeProfilePicture = (req, res, next) => {
    if(!req.user.image) {
        return next()
    }
    const image = req.user.imagePath
    removeImage(image, next)
}

module.exports = {
    removeAdImage,
    removeAdImages,
    removeProfilePicture
}