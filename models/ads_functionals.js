const { users, ads, categories } = require('../models/modelsConfig');

const findAds = () => {
    return ads.findAll({ raw: true })
}

const findAdById = ( id ) => {
    return ads.findByPk(id, { raw: true })
}

const findOneAd = ( condition ) => {
    return ads.findOne({ where: condition, raw: true })
}

const findAdsWhere = ( condition ) => {
    return ads.findAll({ where: condition, raw: true })
}

const createAd = ( obj ) => {
    return ads.create(obj)
}

const updateAd = ( values, condition ) => {
    return ads.update(values, { where: condition })
}

const deleteAd = ( condition ) => {
    return ads.destroy({ where: condition })
}

module.exports = { findAds, findAdById, findOneAd, findAdsWhere, createAd, updateAd, deleteAd }