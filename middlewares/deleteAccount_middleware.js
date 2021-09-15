const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getDeleteAccountPage = async (req, res, next) => res.render('deleteAccount')

const postDeleteAccountPage = async (req, res, next) => {
    await usersFunctionals.deleteUser({ id: req.user.id })

    req.flash('success_msg', 'Account deleted successfully.')
    res.redirect('/profile')
}

module.exports = { getDeleteAccountPage, postDeleteAccountPage }