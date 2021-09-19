const Joi = require('joi');

const messageSchema = Joi.object({
    name: Joi.string().required(),

    phone_number: Joi.string()
        .pattern(new RegExp('[\(]0[0-9]{2}[\)][0-9]{2}-[0-9]{2}-[0-9]{2}'))
        .required(),

    message: Joi.string()
        .required(),
})

module.exports = messageSchema