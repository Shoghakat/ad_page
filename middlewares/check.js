const passport = require('passport')

const initializePassport = require('../configurations/passportConfig.js')
initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/test/account')
    } else {
        next()
    }
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/test/login')
    }
}

const checkNotAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next()
    } else {
        return res.redirect('/test/account')
    }
}

module.exports = { checkAuthenticated, checkNotAuthenticated, checkNotAdmin }