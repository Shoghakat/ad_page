const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')


const getMessagePage = (req, res, next) => {
    const ad = req.ad
    return res.render('message', { ad: ad })
}


const postMessagePage = (req, res, next) => {
    const ad = req.ad
    
    const data = req.body
    data.userId = req.user.id,
    data.adId = ad.id
            
    messagesFunctionals.createMessage(data)
        .then(() => {
            req.flash('success_msg', 'Message sent successfully.')
            return res.redirect(`/item/${ad.id}`)
        })
        .catch(next)
}

module.exports = { getMessagePage, postMessagePage }