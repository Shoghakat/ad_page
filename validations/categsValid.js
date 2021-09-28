const Joi = require('joi');

const categorySchema = Joi.object({
    categ: Joi.string()
        .min(2)
        .max(40)
        .required(),

    name: Joi.string()
        .min(2)
        .max(40)
        .required()
})

module.exports = categorySchema