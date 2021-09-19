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
        req.flash('success_msg', error.message)
        return res.redirect(`/edit/${id}`)
    }
    
    return next()
}


const adValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    const { error } = adValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/ad/${id}`)
    }
    
    return next()
}


const userValidation = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/register`)
    }
    
    next()
}

const profileValidation = (req, res, next) => {
    console.log([req.body])
    const { error } = profileValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/profile`)
    }
    
    next()
}

const messageValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    const { error } = messageValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/message/${id}`)
    }
    
    return next()
}

const messageAnswerValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    const { error } = messageValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/user/messages/${id}`)
    }
    
    return next()
}

module.exports = {
    paramValidation,
    adValidation,
    adValidationEdit,
    userValidation,
    profileValidation,
    messageValidation,
    messageAnswerValidation
}