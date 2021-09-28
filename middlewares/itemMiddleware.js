const usersFunctionals = require('../models/functionals/usersFunctionals')
const adsFunctionals = require('../models/functionals/adsFunctionals')
const adsImagesFunctionals = require('../models/functionals/adsImagesFunctionals')
const messagesFunctionals = require('../models/functionals/messagesFunctionals')

const userFunctionals = new usersFunctionals.methods()
const adFunctionals = new adsFunctionals.methods()
const adImagesFunctionals = new adsImagesFunctionals.methods()
const messageFunctionals = new messagesFunctionals.methods()

const Promise = require('bluebird')

const getItemPage = (req, res, next) => {
    const ad = req.ad
    adImagesFunctionals.findImagesByAdId(ad.id)
        .then(images => {
            userFunctionals.findOneUser(ad.userId)
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
        return adImagesFunctionals.createImage({
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


const deleteMessagesByAdId = (req, res, next) => {
    const ad = req.ad
    messageFunctionals.deleteMessagesByAdId(ad.id)
        .then(() => next())
        .catch(next)
}

const deleteAd = (req, res, next) => {
    const ad = req.ad
    adFunctionals.deleteAd(ad.id)
        .then(() => {
            req.flash('success_msg', 'Post deleted successfully.')
            return res.json({ message: 'Post deleted successfully' })
        })
        .catch(next)
}


module.exports = {
    getItemPage,
    postItemPage,
    createImagesByAdId,
    deleteMessagesByAdId,
    deleteAd
}