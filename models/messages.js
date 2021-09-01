const { Sequelize, sequelize } = require('../configurations/dbConfig.js')

const messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    message: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    adId: Sequelize.INTEGER,
}, {
    freezeTableName: true
})

module.exports = messages