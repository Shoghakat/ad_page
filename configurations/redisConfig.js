const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')

const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
})

// redisClient.on('connect', () => {
//     console.log('Client connected to redis')
// })

module.exports = { RedisStore, redisClient }