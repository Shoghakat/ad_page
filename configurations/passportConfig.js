const localStrategy = require('passport-local').Strategy

const usersFunctionals = require('../models/functionals/usersFunctionals')
const userFunctionals = new usersFunctionals.methods()

const hashPassword = require('./passwordConfig').hashPassword

const initialize = (passport) => {
    const authenticateUser = (email, password, done) => {
        userFunctionals.findOneUserByEmail(email)
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'Email is not registered' })                
                }
                const currentPassword = hashPassword(password, user.salt);
                if(currentPassword !== user.password) {
                    return done(null, false, { message: 'Incorrect password' })    
                }
                return done(null, user);
            })
            .catch(err => done(err))
    }

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        userFunctionals.findOneUser(id)
            .then(user => {
                if(user.status !== "active") {
                    const err = `There is no active user with id ${id}`
                    return res.render('error', { err: err })
                }
                return done(null, user)
            })
            .catch(err => done(err))
    })
}

module.exports = initialize