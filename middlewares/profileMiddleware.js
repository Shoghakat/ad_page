const { usersFunctionals } = require('../models/functionals/functionals')
const userFunctionals = new usersFunctionals.methods()

const getProfilePage = (req, res, next) => {
    const id = req.user.id
    userFunctionals.findOneUser(id)
        .then(user => {
            return res.render('profile', { user: user })
        })
        .catch(next)
}

const postProfilePage = (req, res, next) => {
    userFunctionals.updateUser(req.body, req.user.id)
        .then(() => {
            req.flash('success_msg', 'Profile updated successfully.')
            return res.json({ message: 'Profile updated successfully' })
        })
        .catch(next)
}

module.exports = {
    getProfilePage,
    postProfilePage
}