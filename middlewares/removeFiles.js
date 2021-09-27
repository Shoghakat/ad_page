const fs = require('fs/promises')
const Promise = require('bluebird')

const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const adImagesFunctionals = new adsImagesFunctionals.methods()

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
    adImagesFunctionals.findImagesByAdId(ad.id)
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