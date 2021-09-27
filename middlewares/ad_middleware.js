const Promise = require('bluebird')

const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const adFunctionals = new adsFunctionals.methods()
const adImagesFunctionals = new adsImagesFunctionals.methods()
const categFunctionals = new categsFunctionals.methods()

const { getParentAndChildCategs } = require('./utilities/utilities')


const getCategsListPage = (req, res, next) => {
    categFunctionals.findCategs()
        .then(categs => {
            const data = getParentAndChildCategs(categs)
            res.render('ad', { parentCategs: data.arr1, subCategs: data.arr2 })
        })
        .catch(next)
}


const getCreateAdByCategPage = (req, res, next) => {
    const categ = req.categ
    res.render('advertisement', { categ: categ })
}


const createAd = (req, res, next) => {
    const categ = req.categ

    const data = req.body
    data.userId = req.user.id,
    data.categoryId = categ.id
    
    adFunctionals.createAd(data)
        .then(ad => {
            req.adId = ad.id
            next()
        })
        .catch(next)
}

const createImagesByAdId = (req, res, next) => {
    if(req.files.length === 0) {
        return next()
    }

    return Promise.each(req.files, el => {
        const newImage = {
            filename: el.filename,
            path: el.path,
            adId: req.adId
        }

        adImagesFunctionals.createImage(newImage)
            .then(() => next())
    })
    .catch(next)
}

const completeCreateAd = (req, res, next) => {
    req.flash('success_msg', 'Post published successfully.')
    return res.redirect('/account')
}

module.exports = {
    getCategsListPage,
    getCreateAdByCategPage,
    createAd,
    createImagesByAdId,
    completeCreateAd
}