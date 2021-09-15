const { generateSalt, hashPassword } = require('../configurations/passwordConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getRegisterPage = (req, res) => res.render('register')

const postRegisterPage = async (req, res, next) => {
    const { email, name, password, password2, phone_number, location } = req.body

    const user = await usersFunctionals.findOneUser({ email: email })

    if(user) {
        req.flash('error_msg', 'Emial already exists.')
        res.redirect('/register')
    } else {
        const newSalt = generateSalt()
        const hashedPassword = hashPassword(password, newSalt)

        await usersFunctionals.createUser({
            email: `${email}`,
            name: `${name}`,
            password: `${hashedPassword}`,
            salt: `${newSalt}`,
            phone_number: `${phone_number}`,
            location: `${location}`
        })

        req.flash('success_msg', 'You have registered successfully, please login.')
        res.redirect('/login')
    }
}

module.exports = { getRegisterPage, postRegisterPage }