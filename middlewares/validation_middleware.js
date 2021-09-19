const Promise = require('bluebird')

const adValidationSchema = require('../validations/adsValid');
const userValidationSchema = require('../validations/usersValid');
const profileValidationSchema = require('../validations/profileValid');
const imageValidationSchema = require('../validations/imageValid');
const messageValidationSchema = require('../validations/messageValid');
const paramValidationSchema = require('../validations/paramValid');


const paramValidation = (req, res, next) => {
    const { error } = paramValidationSchema.validate(req.params)
    if(error !== undefined) {
        const err = 'The id must be an integer'
        return res.render('error', { err: err })
    }
    
    next()
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


const adValidationEdit = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    const { error } = adValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('success_msg', error.message)
        return res.redirect(`/edit/${id}`)
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
    const { error } = profileValidationSchema.validate(req.body)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/profile`)
    }
    
    next()
}


const imageProfileValidation = (req, res, next) => {
    const { error } = imageValidationSchema.validate(req.file)
    if(error !== undefined) {
        req.flash('error_msg', error.message)
        return res.redirect(`/profile/picture`)
    }
    return next()
}

const imagesAdValidation = (req, res, next) => {
    if(req.files.length === 0) {
        return next()
    }

    const id = parseInt(req.params.id, 10)
    return Promise.each(req.files, el => {
        const { error } = imageValidationSchema.validate(el)
        if(error !== undefined) {
            req.flash('error_msg', error.message)
            return res.redirect(`/ad/${id}`)
        }
    })
    .then(() => next())
    .catch(() => next())
}

const imagesItemValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    return Promise.each(req.files, el => {
        const { error } = imageValidationSchema.validate(el)
        if(error !== undefined) {
            req.flash('error_msg', error.message)
            return res.redirect(`/item/${id}`)
        }
    })
    .then(() => next())
    .catch(next)
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
    imageProfileValidation,
    imagesAdValidation,
    imagesItemValidation,
    messageValidation,
    messageAnswerValidation
}