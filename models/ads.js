const { Sequelize, sequelize } = require('../configurations/dbConfig')

const ads = sequelize.define('ads', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    image: Sequelize.ARRAY(Sequelize.STRING),
    location: Sequelize.STRING,
    name: Sequelize.STRING,
    phone_number: Sequelize.STRING
}, {
    freezeTableName: true
})

module.exports = ads