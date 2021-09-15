const { users, ads, categories } = require('../models/modelsConfig');

const findCategs = () => {
    return categories.findAll({ raw: true })
}

const findOneCateg = ( condition ) => {
    return categories.findOne({ where: condition, raw: true })
}

const findCategsWhere = ( condition ) => {
    return categories.findAll({ where: condition, raw: true })
}

const createCateg = ( obj ) => {
    return categories.create(obj)
}

const updateCateg = ( values, condition ) => {
    return categories.update(values, { where: condition })
}

const deleteCateg = ( condition ) => {
    return categories.destroy({ where: condition })
}

module.exports = {
    findCategs,
    findOneCateg,
    findCategsWhere,
    createCateg,
    updateCateg,
    deleteCateg
}