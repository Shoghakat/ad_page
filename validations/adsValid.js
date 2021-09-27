const Joi = require('joi');

const adSchema = Joi.object({
    category: Joi.string()
        .allow(null, ''),

    location: Joi.string()
        .min(2)
        .max(40)
        .required(),

    title: Joi.string()
        .min(2)
        .max(40)
        .required(),

    description: Joi.string()
        .min(2)
        .max(255)
        .allow(null, ''),

    image: Joi.string()
        .allow(null, ''),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9]{2}[\)]([0-9]{2})-[0-9]{2}-[0-9]{2}'))
        .required(),

    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
})

module.exports = adSchema