const { Op } = require('sequelize')

const adValidationSchema = require('../validations/adsValid');
const userValidationSchema = require('../validations/usersValid');
const profileValidationSchema = require('../validations/profileValid');
const messageValidationSchema = require('../validations/messageValid');
const paramValidationSchema = require('../validations/paramValid');

const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')


const paramValidation = async (req, res, next) => {
    const { error, value } = paramValidationSchema.validate(req.params)

    if(error !== undefined) {
        const err = 'The id must be an integer'
        res.render('error', { user: req.user, err: err })
    } else {
        next()
    }
}


const adValidationEdit = async (req, res, next) => {
    const id = Number(req.params.id)
    const { error, value } = adValidationSchema.validate(req.body)
    if(error !== undefined) {
        const ad = await adsFunctionals.findOneAd({ id: id })
        if(ad) {
            res.render('edit', { errors: error, user: req.user, ad: ad })
        } else {
            res.send(`There is no ad with id ${id}`)
        }
    } else {
        next()
    }
}


const adValidation = async (req, res, next) => {
    const id = Number(req.params.id)
    const { error, value } = adValidationSchema.validate(req.body)   
    if(error !== undefined) {
        const categ = await categsFunctionals.findOneCateg({ id: id })
        if(categ) {
            res.render('advertisement', { errors: error, user: req.user, categ: categ })
        } else {
            res.send(`There is no ad with id ${id}`)
        }
    } else {
        next()
    }
}


const userValidation = (req, res, next) => {
    const { error, value } = userValidationSchema.validate(req.body)
    if(error !== undefined) {
        res.render('register', { errors: error })
    } else {
        next()
    }
}

const profileValidation = (req, res, next) => {
    const { error, value } = profileValidationSchema.validate(req.body)
    if(error !== undefined) {
        res.render('profile', { errors: error, user: req.user })
    } else {
        next()
    }
}

const messageValidation = async (req, res, next) => {
    const { error, value } = messageValidationSchema.validate(req.body)
    if(error !== undefined) {
        const ad = await adsFunctionals.findOneAd({ id: req.params.id })
        if(ad) {
            res.render('message', { errors: error, ad: ad })
        } else {
            res.send(`There is no ad with id ${req.params.id}`)
        }
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