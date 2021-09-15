const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')
const messagesFunctionals = require('../models/messages_functionals')

const getAccountPage = async (req, res, next) => {
    const id = req.user.id
    const user = await usersFunctionals.findUserById(id)
    const adsByUserId = await adsFunctionals.findAdsWhere({ userId: id })
    
    res.render('account', { ads: adsByUserId, user: user })
}

module.exports = { getAccountPage }