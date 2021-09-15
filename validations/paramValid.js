const Joi = require('joi');

const paramSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .max(2147483647)
        .required()
})

module.exports = paramSchema