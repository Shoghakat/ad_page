const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const flash = require('express-flash')
const cors = require('cors')
const passport = require('passport')
const createError = require('http-errors')

const { RedisStore, redisClient } = require('./configurations/redisConfig')

const { removeUploadedFiles } = require('./middlewares/removeFiles')

const app = express()

app.set('view engine', 'pug')

app.use(morgan(':method :status :url"HTTP/:http-version"'))
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

app.use("/uploads", express.static('./uploads/'));

// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });


app.use('*', (req, res, next) => {
    res.locals.user = req.user || null
    return next()
})

// routes
require('./routes/routes')(app)


// error handling
app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    return removeUploadedFiles(err, req, res, next)
})

app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    res.status(errStatus)
    if(err.status === 401) {
        return res.render('login')
    }
    if(err.status === 403 || err.status === 404) {
        return res.render('error')
    }
    return res.json({ message: `${errStatus} Error: ${err.message}` })
})


// running the server
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})