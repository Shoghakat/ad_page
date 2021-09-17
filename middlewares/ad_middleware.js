const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')


const getCategsListPage = (req, res, next) => {
    categsFunctionals.findCategs()
        .then(categs => {
            return Promise.reduce(categs, (acc, el) => {
                if(el.parentId === null) {
                    acc.arr1.push(el)
                } else {
                    acc.arr2.push(el)
                }
                return acc
            }, {
                arr1: [],
                arr2: []
            })
        })
        .then(data => res.render('ad', { parentCategs: data.arr1, subCategs: data.arr2 }) )
        .catch(next)
}


const checkCateg = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    categsFunctionals.findOneCateg({ id: id })
        .then(categ => {
            if(!categ) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }
            
            req.categ = categ
            return next()
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
    
    adsFunctionals.createAd(data)
        .then(ad => {
            req.adId = ad.id
            next()
        })
        .catch(next)
}

const createImageByAdId = (req, res, next) => {
    if(req.files.length === 0) {
        return next()
    }

    return Promise.each(req.files, el => {
        const newImage = {
            filename: el.filename,
            path: el.path,
            adId: req.adId
        }

        adsImagesFunctionals.createImage(newImage)
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
    checkCateg,
    getCreateAdByCategPage,
    createAd,
    createImageByAdId,
    completeCreateAd
}