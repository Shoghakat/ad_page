const Promise = require('bluebird')

const adsFunctionals = require('../models/functionals/adsFunctionals')
const adsImagesFunctionals = require('../models/functionals/adsImagesFunctionals')
const categsFunctionals = require('../models/functionals/categoriesFunctionals')

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
            return next()
        })
        .catch(next)
}

const createImagesByAdId = (req, res, next) => {
    console.log(req.files)
    if(req.files.length === 0) {
        return next()
    }
    return Promise.each(req.files, el => {
        const newImage = {
            filename: el.filename,
            path: el.path,
            adId: req.adId
        }
        return adImagesFunctionals.createImage(newImage)
    })
    .then(() => next())
    .catch(next)
}

const completeCreateAd = (req, res, next) => {
    req.flash('success_msg', 'Post published successfully.')
    return res.redirect('/account')
    // return res.json({ message: 'Post published successfully' })
}

module.exports = {
    getCategsListPage,
    getCreateAdByCategPage,
    createAd,
    createImagesByAdId,
    completeCreateAd
}