const fs = require('fs/promises')
const Promise = require('bluebird')

const adsImagesFunctionals = require('../models/functionals/adsImagesFunctionals')
const adImagesFunctionals = new adsImagesFunctionals.methods()

const removeImage = (image, cb) => {
    fs.unlink(image)
        .then(cb)
        .catch(cb)
}

const removeProfilePicture = (req, res, next) => {
    if(!req.user.image) {
        return next()
    }
    const image = req.user.imagePath
    removeImage(image, next)
}


const removeAdImage = (req, res, next) => {
    const image = req.image.path
    removeImage(image, next)
}

const removeAdImages = (req, res, next) => {
    const ad = req.ad
    adImagesFunctionals.findImagesByAdId(ad.id)
        .then(images => {
            return Promise.map(images, el => fs.unlink(el.path) )
        })
        .then(() => next())
        .catch(() => next())
}


const removeUploadedFiles = (err, req, res, next) => {
    if(!req.files || req.files.length === 0) {
        return next(err)
    }
    return Promise.map(req.files, el => fs.unlink(el.path) )
        .then(() => next(err))
        .catch(next)
}


module.exports = {
    removeProfilePicture,
    removeAdImage,
    removeAdImages,
    removeUploadedFiles
}