// require('dotenv').config()
const { Sequelize } = require('sequelize')

// 'postgres://user:pass@example.com:5432/dbname'
// const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// const sequelize = new Sequelize(connectionString)


const sequelize = new Sequelize(`my_database`, `postgres`, `user111`, {
    schema: 'test_2',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = { Sequelize, sequelize }