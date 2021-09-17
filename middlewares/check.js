const passport = require('passport')

const initializePassport = require('../configurations/passportConfig')
initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } 
    return res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/account')
    }
    return next()
}

const checkAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        return next()
    }
    return res.redirect('/account')
}

module.exports = { checkAuthenticated, checkNotAuthenticated, checkAdmin }