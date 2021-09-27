const usersFunctionals = require('../models/functionals/users_functionals')
const userFunctionals = new usersFunctionals.methods()

const { generateSalt, hashPassword } = require('../configurations/passwordConfig')

const getRegisterPage = (req, res) => res.render('register')

const postRegisterPage = (req, res, next) => {
    const { email, name, password, password2, phone_number, location } = req.body

    userFunctionals.findOneUserByEmail(email)
        .then(user => {
            if(user) {
                req.flash('error_msg', 'Emial already exists.')
                return res.redirect('/register')
            }
            
            const newSalt = generateSalt()
            const hashedPassword = hashPassword(password, newSalt)
            
            const data = {
                email: email,
                name: name,
                password: hashedPassword,
                salt: newSalt,
                phone_number: phone_number || null,
                location: location || null
            }
            userFunctionals.createUser(data)
                .then(() => {
                    req.flash('success_msg', 'You have registered successfully, please login.')
                    return res.redirect('/login')
                })
        })
        .catch(next)
}

module.exports = { getRegisterPage, postRegisterPage }