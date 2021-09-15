const { Op } = require('sequelize')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getHomePage = async (req, res, next) => {
    const arr1 = await categsFunctionals.findCategsWhere({ parentId: null })
        .catch(next)

    const arr2 = await categsFunctionals.findCategsWhere({ parentId: { [Op.ne]: null } })
        .catch(next)

    res.render('home', { main: arr1, subs: arr2, user: req.user })
}

module.exports = { getHomePage }