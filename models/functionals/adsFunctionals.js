const { ads } = require('../models/modelsConfig');

class methods {
    findOneAd(id) {
        return ads.findOne({ where: { id }, raw: true })
    }

    findOneAdByCategId(categoryId) {
        return ads.findOne({ where: { categoryId }, raw: true })
    }

    findAdsByUserId(userId) {
        return ads.findAll({ where: { userId }, raw: true })
    }

    createAd(ad) {
        return ads.create(ad, { raw: true })
    }

    updateAd(values, id) {
        return ads.update(values, { where: { id } })
    }

    deleteAd(id) {
        return ads.destroy({ where: { id } })
    }

    deleteAdByUserId(userId) {
        return ads.destroy({ where: { userId } })
    }
}

module.exports = { methods }