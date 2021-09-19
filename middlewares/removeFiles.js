const fs = require('fs/promises')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const removeAdImage = (req, res, next) => {
    const image = req.image
    fs.unlink(image.path)
        .then(() => next())
        .catch(() => next())
}

const removeProfilePicture = (req, res, next) => {
    fs.unlink(req.user.imagePath)
        .then(() => next())
        .catch(() => next())
}

module.exports = {
    removeAdImage,
    removeProfilePicture
}