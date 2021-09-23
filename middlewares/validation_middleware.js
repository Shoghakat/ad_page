const adValidationSchema = require('../validations/adsValid');
const userValidationSchema = require('../validations/usersValid');
const profileValidationSchema = require('../validations/profileValid');
const messageValidationSchema = require('../validations/messageValid');
const paramValidationSchema = require('../validations/paramValid');

const { validationFunction } = require('./utilities')


const paramValidation = (req, res, next) => {
    const { error } = paramValidationSchema.validate(req.params)
    if(error !== undefined) {
        const err = 'The id must be an integer'
        return res.render('error', { err: err })
    }
    return next()
}


const adValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = adValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/ad/${id}`)
}


const adValidationEdit = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = adValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/edit/${id}`)
}


const userValidation = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/register`)
}

const profileValidation = (req, res, next) => {
    const { error } = profileValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/profile`)
}


const messageValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = messageValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/message/${id}`)
}

const messageAnswerValidation = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const { error } = messageValidationSchema.validate(req.body)
    return validationFunction(req, res, next, error, `/user/messages/${id}`)
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