const passport = require('passport')

const initializePassport = require('../configurations/passportConfig')
initializePassport(passport);

const getLoginPage = (req, res) => res.render('login')

const postLoginPage = passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true,
})

module.exports = { getLoginPage, postLoginPage }