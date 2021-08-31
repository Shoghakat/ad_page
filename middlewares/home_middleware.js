const { Op } = require('sequelize')

const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getHomePage = async (req, res, next) => {
    const arr1 = await categsFunctionals.findCategsWhere({ parentId: null })
        .catch(next)

    const arr2 = await categsFunctionals.findCategsWhere({ parentId: { [Op.ne]: null } })
        .catch(next)

    res.render('home', { main: arr1, subs: arr2 })
}

module.exports = { getHomePage }