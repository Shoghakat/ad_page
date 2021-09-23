const Joi = require('joi');

const messageSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9]{2}[\)][0-9]{2}-[0-9]{2}-[0-9]{2}'))
        .required(),

    message: Joi.string()
        .min(1)
        .max(1000)
        .required()
})

module.exports = messageSchema