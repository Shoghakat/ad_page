const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    password2: Joi.ref('password'),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9]{2}[\)]([0-9]{2})-[0-9]{2}-[0-9]{2}'))
        .allow(null, ''),

    location: Joi.string()
        .min(2)
        .max(40)
        .allow(null, ''),
})

module.exports = userSchema