const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getAccountPage = async (req, res, next) => {
    const id = req.user.id
    const user = await usersFunctionals.findUserById(id)
    const adsByUserId = await adsFunctionals.findAdsWhere({ userId: id })
    
    res.render('account', { ads: adsByUserId, user: user })
}

module.exports = { getAccountPage }