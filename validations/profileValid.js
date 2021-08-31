const Joi = require('joi');

const profileSchema = Joi.object({
    email: Joi.string().email().allow(null, ''),

    name: Joi.string().required(),

    location: Joi.string().allow(null, ''),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9]{2}[\)][0-9]{2}-[0-9]{2}-[0-9]{2}'))
        .allow(null, ''),

    image: Joi.string().allow(null, ''),

    delete: Joi.boolean()
})

module.exports = profileSchema