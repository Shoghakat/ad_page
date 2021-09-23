const { sequelize } = require('../configurations/dbConfig')

const passport = require('passport')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const initializePassport = require('../configurations/passportConfig')
initializePassport(passport);


const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } 
    return res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/account')
    }
    return next()
}

const checkAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.redirect('/account')
    }
    return next()
}


const checkCateg = (req, res, next, id) => {
    categsFunctionals.findOneCateg({ id: id })
        .then(categ => {
            if(!categ) {
                const err = `There is no category with id ${id}`
                return res.render('error', { err: err })
            }
            req.categ = categ
            return next()
        })
        .catch(next)
}

const checkCategByParams = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    return checkCateg(req, res, next, id)
}

const checkCategByBody = (req, res, next) => {
    const id = req.body.categId
    return checkCateg(req, res, next, id)
}

const checkNotCateg = (req, res, next) => {
    categsFunctionals.findOneCateg({ name: req.body.name })
        .then(categ => {
            if(categ) {
                req.flash('error_msg', 'Category already exists.')
                return res.redirect('/add/category')
            }
            return next()
        })
}

const checkHasChildCateg = (req, res, next) => {
    const categ = req.categ
    categsFunctionals.findOneCateg({ parentId: categ.id })
        .then(subcateg => {
            if(subcateg) {
                req.flash('error_msg', 'Category cannot be deleted since it contains subcategories.')
                return res.redirect('/delete/category')
            }
            return next()
        })
        .catch(next)
}

const checkHasAd = (req, res, next) => {
    const categ = req.categ
    adsFunctionals.findOneAd({ categoryId: categ.id })
        .then(ad => {
            if(ad) {
                req.flash('error_msg', 'Subcategory cannot be deleted since it contains advertisements.')
                return res.redirect('/delete/category')
            }
            return next()
        })
        .catch(next)
}

const checkHasChildOrAd = (req, res, next) => {
    const categ = req.categ
    if(categ.parentId) {
        return checkHasAd(req, res, next)
    }
    return checkHasChildCateg(req, res, next)
}



const checkAd = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    adsFunctionals.findOneAd({ id: id })
        .then(ad => {
            if(!ad) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }
            req.ad = ad
            return next()
        })
        .catch(next)
}

const checkAdOwner = (req, res, next) => {
    const ad = req.ad
    if(req.user.id !== ad.userId) {
        req.flash('error_msg', `Post with id ${ad.id} does not belong to you.`)
        return res.redirect(`/account`)
    }
    return next()
}



const checkImage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    adsImagesFunctionals.findOneImage({ id: id })
        .then(image => {
            if(!image) {
                const err = `There is no image with id ${id}`
                return res.render('error', { err: err })
            }
            req.image = image
            return next()
        })
        .catch(next)
}

const checkImageOwner = (req, res, next) => {
    const image = req.image
    adsFunctionals.findOneAd({ id: image.adId })
        .then(ad => {
            if(ad.userId !== req.user.id) {
                const err = `The image with id ${image.id} does not belong to your advertisement`
                return res.render('error', { err: err })
            }
            // req.ad = ad
            return next()
        })
        .catch(next)
}

const checkImagesNumber = (req, res, next) => {
    const ad = req.ad
    let numFiles = req.files.length
    sequelize.query(`
        SELECT COUNT(*)
        FROM test_2.ads_images
        GROUP BY "adId"
        HAVING "adId" = :ad_id`,
        {
            replacements: { ad_id: ad.id },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            if(data.length > 0) {
                numFiles += parseInt(data[0].count, 10)
            }
            if(numFiles > 5) {
                const err = `The number of images cannot be more than 5`
                return res.render('error', { err: err })
            }
            return next()
        })
        .catch(next)
}



const checkMessage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    messagesFunctionals.findOneMessage({ id: id })
        .then(message => {
            if(!message) {
                const err = `There is no message with id ${id}`
                return res.render('error', { err: err })
            }
            req.message = message
            return next()
        })
        .catch(next)
}

const checkMessageOwner = (req, res, next) => {
    const message = req.message
    adsFunctionals.findOneAd({ id: message.adId })
        .then(ad => {
            if(message.userId !== req.user.id && ad.userId !== req.user.id) {
                const err = `The message with id ${message.id} does not belong to you`
                return res.render('error', { err: err })
            }
            req.ad = ad
            return next()
        })
        .catch(next)
}


module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkAdmin,
    checkCategByParams,
    checkCategByBody,
    checkNotCateg,
    checkHasChildCateg,
    checkHasAd,
    checkHasChildOrAd,
    checkAd,
    checkAdOwner,
    checkImage,
    checkImageOwner,
    checkImagesNumber,
    checkMessage,
    checkMessageOwner
}