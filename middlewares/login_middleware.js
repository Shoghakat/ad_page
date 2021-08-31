const passport = require('passport')

const initializePassport = require('../configurations/passportConfig.js')
initializePassport(passport);

const getLoginPage = (req, res) => res.render('login')

const postLoginPage = passport.authenticate('local', {
    successRedirect: '/test/account',
    failureRedirect: '/test/login',
    failureFlash: true,
})

module.exports = { getLoginPage, postLoginPage }