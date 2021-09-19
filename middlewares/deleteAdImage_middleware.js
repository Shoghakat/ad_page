const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


const getDeleteAdImagePage = (req, res, next) => {
    const image = req.image
    res.render('deleteAdImage', { image: image })
}


const deleteAdImage = (req, res, next) => {
    const image = req.image
    adsImagesFunctionals.deleteImage({ id: image.id })
        .then(() => {
            return next()
        })
        .catch(next)
}


const postDeleteAdImagePage = (req, res, next) => {
    const image = req.image
    req.flash('success_msg', 'Image deleted successfully.')
    return res.redirect(`/item/${image.adId}`)
}


module.exports = {
    getDeleteAdImagePage,
    deleteAdImage,
    postDeleteAdImagePage
}