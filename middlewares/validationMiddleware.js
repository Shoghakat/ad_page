const categValidationSchema = require('../validations/categsValid');
const adValidationSchema = require('../validations/adsValid');
const userValidationSchema = require('../validations/usersValid');
const profileValidationSchema = require('../validations/profileValid');
const messageValidationSchema = require('../validations/messageValid');
const paramValidationSchema = require('../validations/paramValid');

const { checkValidError } = require('./utilities/checkError')


const paramValidation = (req, res, next) => {
    const { error } = paramValidationSchema.validate(req.params)
    if(error !== undefined) {
        error.details[0].status = 404
        req.flash('error_msg', error.message)
        return next(error.details[0])
    }
    return next()
}


const categValidation = (req, res, next) => {
    const { error } = categValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}


const adValidation = (req, res, next) => {
    const { error } = adValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}


const adValidationEdit = (req, res, next) => {
    const { error } = adValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}


const userValidation = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}

const profileValidation = (req, res, next) => {
    const { error } = profileValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}


const messageValidation = (req, res, next) => {
    const { error } = messageValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}

const messageAnswerValidation = (req, res, next) => {
    const { error } = messageValidationSchema.validate(req.body)
    return checkValidError(error, req, res, next)
}

module.exports = {
    paramValidation,
    categValidation,
    adValidation,
    adValidationEdit,
    userValidation,
    profileValidation,
    messageValidation,
    messageAnswerValidation
}