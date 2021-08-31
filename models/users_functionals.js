const { users, ads, categories } = require('../models/modelsConfig.js');

const findUsers = () => {
    return users.findAll({ raw: true })
}

const findUserById = ( id ) => {
    return users.findByPk(id, { raw: true })
}

const findOneUser = ( condition ) => {
    return users.findOne({ where: condition, raw: true })
}

const findUsersWhere = ( condition ) => {
    return users.findAll({ where: condition, raw: true })
}

const createUser = ( obj ) => {
    return users.create(obj)
}

const updateUser = ( values, condition ) => {
    return users.update(values, { where: condition })
}

const deleteUser = ( condition ) => {
    return users.destroy({ where: condition })
}

module.exports = { findUsers, findUserById, findOneUser, findUsersWhere, createUser, updateUser, deleteUser }