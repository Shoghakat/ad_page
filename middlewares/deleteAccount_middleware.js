const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getDeleteAccountPage = (req, res, next) => res.render('deleteAccount')

const deleteAccount = (req, res, next) => {
    const id = req.user.id
    req.logOut()
    usersFunctionals.deleteUser({ id: id })
        .then(() => {
            req.flash('success_msg', 'Account deleted successfully.')
            res.redirect('/login')
        })
        .catch(next)
}

module.exports = {
    getDeleteAccountPage,
    deleteAccount
}