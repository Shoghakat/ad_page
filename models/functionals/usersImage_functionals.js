const { users_image } = require('../models/modelsConfig');

const findImages = () => {
    return users_image.findAll({ raw: true })
}

const findOneImage = ( condition ) => {
    return users_image.findOne({ where: condition, raw: true })
}

const findImagesWhere = ( condition ) => {
    return users_image.findAll({ where: condition, raw: true })
}

const createImage = ( obj ) => {
    return users_image.create(obj)
}

const updateImage = ( values, condition ) => {
    return users_image.update(values, { where: condition })
}

const deleteImage = ( condition ) => {
    return users_image.destroy({ where: condition })
}

module.exports = {
    findImages,
    findOneImage,
    findImagesWhere,
    createImage,
    updateImage,
    deleteImage
}