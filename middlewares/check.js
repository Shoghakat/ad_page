const passport = require('passport')

const initializePassport = require('../configurations/passportConfig')
initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/account')
    } else {
        next()
    }
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/login')
    }
}

const checkNotAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next()
    } else {
        return res.redirect('/account')
    }
}

module.exports = { checkAuthenticated, checkNotAuthenticated, checkNotAdmin }