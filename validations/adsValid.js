const Joi = require('joi');

const adSchema = Joi.object({
    category: Joi.string(),

    location: Joi.string()
        .required(),

    title: Joi.string()
        .required(),

    description: Joi.string()
        .allow(null, ''),

    image: Joi.array()
        .items(Joi.string())
        .allow(null, ''),

    delete: Joi.string(),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9][0-9][\)][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'))
        .required(),

    name: Joi.string()
        .required()
})

module.exports = adSchema