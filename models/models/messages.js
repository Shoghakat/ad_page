const { Sequelize, sequelize } = require('../../configurations/dbConfig')

const messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    messages: Sequelize.ARRAY(Sequelize.JSON),
    userId: Sequelize.INTEGER,
    adId: Sequelize.INTEGER,
}, {
    freezeTableName: true
})

module.exports = messages