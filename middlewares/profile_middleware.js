const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getProfilePage = (req, res, next) => {
    const id = req.user.id
    usersFunctionals.findOneUser({ id: id })
        .then(user => {
            return res.render('profile', { user: user })
        })
        .catch(next)
}

const postProfilePage = (req, res, next) => {
    usersFunctionals.updateUser(req.body, { id: req.user.id })
        .then(() => {
            req.flash('success_msg', 'Profile updated successfully.')
            return res.redirect('/account')
        })
        .catch(next)
}

module.exports = {
    getProfilePage,
    postProfilePage
}