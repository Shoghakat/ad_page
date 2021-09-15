const { Sequelize, sequelize } = require('../configurations/dbConfig')

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    location: Sequelize.STRING,
    image: Sequelize.STRING,
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "active"
    }
}, {
    freezeTableName: true
})

module.exports = users