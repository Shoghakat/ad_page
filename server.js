const express = require('express')
const session = require('express-session')

const createError = require('http-errors')

const flash = require('express-flash')
const passport = require('passport')

const { RedisStore, redisClient } = require('./configurations/redisConfig.js')

const app = express()

app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// routes
require('./routes/routes.js')(app)


// error handling
app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    res.status(errStatus)
    res.send(`${errStatus} Error: ${err.message}`)
})


// running the server
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})