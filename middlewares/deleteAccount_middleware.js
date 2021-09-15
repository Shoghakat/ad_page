const { users, ads, categories } = require('../models/modelsConfig');

const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')

const getDeleteAccountPage = async (req, res, next) => res.render('deleteAccount')

const postDeleteAccountPage = async (req, res, next) => {
    await usersFunctionals.deleteUser({ id: req.user.id })

    req.flash('success_msg', 'Account deleted successfully.')
    res.redirect('/profile')
}

module.exports = { getDeleteAccountPage, postDeleteAccountPage }