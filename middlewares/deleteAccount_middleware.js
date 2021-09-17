const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getDeleteAccountPage = (req, res, next) => res.render('deleteAccount')

const deleteAccount = (req, res, next) => {
    usersFunctionals.deleteUser({ id: req.user.id })
        .then(() => {
            req.flash('success_msg', 'Account deleted successfully.')
            res.redirect('/profile')
        })
        .catch(next)
}

module.exports = {
    getDeleteAccountPage,
    deleteAccount
}