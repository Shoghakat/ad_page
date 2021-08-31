const { users, ads, categories } = require('../models/modelsConfig.js');

const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getDeleteAccountPage = async (req, res, next) => res.render('deleteAccount')

const postDeleteAccountPage = async (req, res, next) => {
    await usersFunctionals.deleteUser({ id: req.user.id })

    req.flash('success_msg', 'Account deleted successfully.')
    res.redirect('/test/profile')
}

module.exports = { getDeleteAccountPage, postDeleteAccountPage }