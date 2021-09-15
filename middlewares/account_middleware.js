const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getAccountPage = async (req, res, next) => {
    const id = req.user.id
    const user = await usersFunctionals.findOneUser({ id: id })
    const adsByUserId = await adsFunctionals.findAdsWhere({ userId: id })
    
    res.render('account', { ads: adsByUserId, user: user })
}

module.exports = { getAccountPage }