const { Sequelize, sequelize } = require('../configurations/dbConfig')

const categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    freezeTableName: true
})

module.exports = categories