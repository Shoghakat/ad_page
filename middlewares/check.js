const passport = require('passport')

const usersFunctionals = require('../models/functionals/usersFunctionals')
const adsFunctionals = require('../models/functionals/adsFunctionals')
const adsImagesFunctionals = require('../models/functionals/adsImagesFunctionals')
const categsFunctionals = require('../models/functionals/categoriesFunctionals')
const messagesFunctionals = require('../models/functionals/messagesFunctionals')

const adFunctionals = new adsFunctionals.methods()
const adImagesFunctionals = new adsImagesFunctionals.methods()
const categFunctionals = new categsFunctionals.methods()
const messageFunctionals = new messagesFunctionals.methods()
const userFunctionals = new usersFunctionals.methods()

const { getNumberOfAdImages } = require('./utilities/queries')

const { checkItem } = require('./utilities/checkError')

const initializePassport = require('../configurations/passportConfig')
initializePassport(passport);


const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    const err = {
        status: 401,
        message: 'Please register first'
    }
    req.flash('error_msg', err.message)
    return next(err)
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/account')
    }
    return next()
}

const checkAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        return next()
    }
    const err = {
        status: 403,
        message: 'You are not an admin'
    }
    req.flash('error_msg', err.message)
    return next(err)
}


const checkNotUser = (req, res, next) => {
    const email = req.body.email
    userFunctionals.findOneUserByEmail(email)
        .then(user => {
            if(user) {
                const message = 'Emial already exists.'
                return checkItem(req, next, 406, message)
            }
            return next()
        })
        .catch(next)
}


const checkCateg = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    categFunctionals.findOneCateg(id)
        .then(categ => {
            if(!categ) {
                const message = `There is no category with id ${id}.`
                return checkItem(req, next, 404, message)
            }
            req.categ = categ
            return next()
        })
        .catch(next)
}

const checkNotCateg = (req, res, next) => {
    categFunctionals.findOneCategByName(req.body.name)
        .then(categ => {
            if(categ) {
                const message = 'Category already exists.'
                return checkItem(req, next, 406, message)
            }
            return next()
        })
}

const checkHasChildCateg = (req, res, next) => {
    const categ = req.categ
    categFunctionals.findOneCategByParentId(categ.id)
        .then(subcateg => {
            if(subcateg) {
                const message = 'Category cannot be deleted since it contains subcategories.'
                return checkItem(req, next, 405, message)
            }
            return next()
        })
        .catch(next)
}

const checkHasAd = (req, res, next) => {
    const categ = req.categ
    adFunctionals.findOneAdByCategId(categ.id)
        .then(ad => {
            if(ad) {
                const message = 'Subcategory cannot be deleted since it contains advertisements.'
                return checkItem(req, next, 405, message)
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
    adFunctionals.findOneAd(id)
        .then(ad => {
            if(!ad) {
                const message = `There is no ad with id ${id}`
                return checkItem(req, next, 404, message)
            }
            req.ad = ad
            return next()
        })
        .catch(next)
}

const checkAdOwner = (req, res, next) => {
    const ad = req.ad
    if(req.user.id !== ad.userId) {
        const message = `Post with id ${ad.id} does not belong to you.`
        return checkItem(req, next, 403, message)
    }
    return next()
}



const checkImage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    adImagesFunctionals.findOneImage(id)
        .then(image => {
            if(!image) {
                const message = `There is no image with id ${id}`
                return checkItem(req, next, 404, message)
            }
            req.image = image
            return next()
        })
        .catch(next)
}

const checkImageOwner = (req, res, next) => {
    const image = req.image
    adFunctionals.findOneAd(image.adId)
        .then(ad => {
            if(ad.userId !== req.user.id) {
                const message = `The image with id ${image.id} does not belong to your advertisement`
                return checkItem(req, next, 403, message)
            }
            return next()
        })
        .catch(next)
}

const checkImagesNumber = (req, res, next) => {
    const ad = req.ad
    let numFiles = req.files.length
    return getNumberOfAdImages(ad.id)
        .then(data => {
            if(data.length > 0) {
                numFiles += parseInt(data[0].count, 10)
            }
            if(numFiles > 5) {
                const message = `The number of images cannot be more than 5`
                return checkItem(req, next, 406, message)
            }
            return next()
        })
        .catch(next)
}



const checkMessage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    messageFunctionals.findOneMessage(id)
        .then(message => {
            if(!message) {
                const message = `There is no message with id ${id}`
                return checkItem(req, next, 404, message)
            }
            req.message = message
            return next()
        })
        .catch(next)
}

const checkMessageOwner = (req, res, next) => {
    const message = req.message
    adFunctionals.findOneAd(message.adId)
        .then(ad => {
            console.log(message.userId !== req.user.id && ad.userId !== req.user.id)
            if(message.userId !== req.user.id && ad.userId !== req.user.id) {
                const newMessage = `The message with id ${message.id} does not belong to you`
                return checkItem(req, next, 403, newMessage)
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
    checkNotUser,
    checkCateg,
    checkNotCateg,
    checkHasChildOrAd,
    checkAd,
    checkAdOwner,
    checkImage,
    checkImageOwner,
    checkImagesNumber,
    checkMessage,
    checkMessageOwner
}