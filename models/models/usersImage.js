const { Sequelize, sequelize } = require('../../configurations/dbConfig')

const users_image = sequelize.define('users_image', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    filename: Sequelize.STRING,
    path: Sequelize.STRING
}, {
    freezeTableName: true
})

module.exports = users_image