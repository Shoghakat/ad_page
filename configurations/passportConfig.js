const localStrategy = require('passport-local').Strategy

const users = require('../models/modelsConfig').users
const usersFunctionals = require('../models/users_functionals')

const hashPassword = require('./passwordConfig').hashPassword

const initialize = (passport) => {
    const authenticateUser = (email, password, done) => {
        users.findOne({ where: { email: email } })
            .then(user => {
                if(user) {
                    const currentPassword = hashPassword(password, user.salt);

                    if(currentPassword === user.password) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password' })
                    }
                } else {
                    return done(null, false, { message: 'Email is not registered' })
                }
            })
            .catch(err => done(err))
    }

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        usersFunctionals.findOneUser({ id: id })
            .then(user => done(null, user))
            .catch(err => done(err))
    })
}

module.exports = initialize