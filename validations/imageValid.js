const Joi = require('joi');

const imageSchema = Joi.object({
    fieldname: Joi.string()
        .valid('image'),

    originalname: Joi.string()
        .required(),

    encoding: Joi.string()
        .valid('7bit'),

    mimetype: Joi.string()
        .required(),

    destination: Joi.string()
        .required(),

    filename: Joi.string()
        .required(),

    path: Joi.string()
        .required(),

    size: Joi.number()
        .integer()
        .required()
})

module.exports = imageSchema