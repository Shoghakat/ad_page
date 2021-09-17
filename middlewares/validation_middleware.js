const adValidationSchema = require('../validations/adsValid');
const userValidationSchema = require('../validations/usersValid');
const profileValidationSchema = require('../validations/profileValid');
const messageValidationSchema = require('../validations/messageValid');
const paramValidationSchema = require('../validations/paramValid');

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


const paramValidation = (req, res, next) => {
    const { error } = paramValidationSchema.validate(req.params)

    if(error !== undefined) {
        const err = 'The id must be an integer'
        return res.render('error', { err: err })
    }
    
    next()
}


const adValidationEdit = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = adValidationSchema.validate(req.body)
    if(error !== undefined) {
        adsFunctionals.findOneAd({ id: id })
            .then(ad => {
                if(!ad) {
                    return res.send(`There is no ad with id ${id}`) 
                }
                
                return res.render('edit', { errors: error, ad: ad })
            })
            .catch(next)
    } else {
        next()
    }
}


const adValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = adValidationSchema.validate(req.body)   
    if(error !== undefined) {
        categsFunctionals.findOneCateg({ id: id })
            .then(categ => {
                if(!categ) {
                    return res.send(`There is no ad with id ${id}`)
                }
                
                return res.render('advertisement', { errors: error, categ: categ })
            })
            .catch(next)
    } else {
        next()
    }
}


const userValidation = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body)
    if(error !== undefined) {
        return res.render('register', { errors: error })
    }
    
    next()
}

const profileValidation = (req, res, next) => {
    const { error } = profileValidationSchema.validate(req.body)
    if(error !== undefined) {
        return res.render('profile', { errors: error })
    }
    
    next()
}

const messageValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = messageValidationSchema.validate(req.body)
    if(error !== undefined) {
        adsFunctionals.findOneAd({ id: id })
            .then(ad => {
                if(!ad) {
                    return res.send(`There is no ad with id ${id}`)
                }

                return res.render('message', { errors: error, ad: ad })
            })
            .catch(next)
    } else {
        next()
    }
}

module.exports = {
    adValidation,
    adValidationEdit,
    userValidation,
    profileValidation,
    messageValidation,
    paramValidation
}