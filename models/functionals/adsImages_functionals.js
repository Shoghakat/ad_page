const { ads_images } = require('../models/modelsConfig');

const findImages = () => {
    return ads_images.findAll({ raw: true, limit: 50 })
}

const findOneImage = ( condition ) => {
    return ads_images.findOne({ where: condition, raw: true })
}

const findImagesWhere = ( condition ) => {
    return ads_images.findAll({ where: condition, raw: true, limit: 50 })
}

const createImage = ( obj ) => {
    return ads_images.create(obj)
}

const updateImage = ( values, condition ) => {
    return ads_images.update(values, { where: condition })
}

const deleteImage = ( condition ) => {
    return ads_images.destroy({ where: condition })
}

module.exports = {
    findImages,
    findOneImage,
    findImagesWhere,
    createImage,
    updateImage,
    deleteImage
}