const { users, ads, categories, messages } = require('../models/modelsConfig.js');

const findMessages = () => {
    return messages.findAll({ raw: true })
}

const findMessageById = ( id ) => {
    return messages.findByPk(id, { raw: true })
}

const findOneMessage = ( condition ) => {
    return messages.findOne({ where: condition, raw: true })
}

const findMessagesWhere = ( condition ) => {
    return messages.findAll({ where: condition, raw: true })
}

const createMessage = ( obj ) => {
    return messages.create(obj)
}

const updateMessage = ( values, condition ) => {
    return messages.update(values, { where: condition })
}

const deleteMessage = ( condition ) => {
    return messages.destroy({ where: condition })
}

module.exports = {
    findMessages,
    findMessageById,
    findOneMessage,
    findMessagesWhere,
    createMessage,
    updateMessage,
    deleteMessage
}