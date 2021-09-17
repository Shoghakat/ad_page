const { Sequelize, sequelize } = require('../../configurations/dbConfig')

const ads_images = sequelize.define('ads_images', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    filename: Sequelize.STRING,
    path: Sequelize.STRING
}, {
    freezeTableName: true
})

module.exports = ads_images