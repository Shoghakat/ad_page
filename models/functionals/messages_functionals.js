const { Op } = require('sequelize')

const { messages } = require('../models/modelsConfig');

class methods {
    findOneMessage(id) {
        return messages.findOne({ where: { id }, raw: true })
    }

    findMessagesByConvId(conversationId) {
        return messages.findAll({ where: { conversationId }, raw: true })
    }

    createMessage(message) {
        return messages.create(message)
    }

    deleteMessagesByAdId(adId) {
        return messages.destroy({ where: { adId } })
    }

    deleteMessages(userId, adsIds) {
        return messages.destroy({
            where: {
                [Op.or] : [
                    { userId },
                    { adId: { [Op.or]: adsIds } }
                ]
            } 
        })
    }
}

module.exports = { methods }