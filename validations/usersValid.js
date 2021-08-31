const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    
    name: Joi.string()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    password2: Joi.ref('password'),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9][0-9][\)][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'))
        .allow(null, ''),

    location: Joi.string()
        .allow(null, ''),
})

module.exports = userSchema