const fs = require('file-system')
const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const deleteAdsImages = (req, res, next) => {
    adsFunctionals.findAdsWhere({ userId: req.user.id })
        .then(ads => {
            return Promise.each(ads, ad => {
                return Promise.each(ad.image, image => {
                    console.log(image)
                    // fs.unlink('../uploads/ads/' + image)
                })
            })
        })
        .catch(next) 
}

const deleteProfileImage = (req, res, next) => {
    console.log(user.image)
}

module.exports = {
    deleteAdsImages,
    deleteProfileImage
}