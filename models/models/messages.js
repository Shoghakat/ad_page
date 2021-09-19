const { Sequelize, sequelize } = require('../../configurations/dbConfig')

const messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    message: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    adId: Sequelize.INTEGER,
    conversationId: Sequelize.INTEGER
}, {
    freezeTableName: true
})

module.exports = messages