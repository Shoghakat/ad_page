const { ads_images } = require('../models/modelsConfig');

class methods {
    findOneImage(id) {
        return ads_images.findOne({ where: { id }, raw: true })
    }

    findImagesByAdId(adId) {
        return ads_images.findAll({ where: { adId }, raw: true })
    }

    createImage(image) {
        return ads_images.create(image)
    }

    deleteImage(id) {
        return ads_images.destroy({ where: { id } })
    }
}

module.exports = { methods }