const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getMessagePage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    
    adsFunctionals.findOneAd({ id: id })
        .then(ad => {
            if(!ad) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }

            return res.render('message', { ad: ad })
        })
        .catch(next)
}

const postMessagePage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    
    adsFunctionals.findOneAd({ id: id })
        .then(ad => {
            const data = {}
            data.messages = []
            data.messages.push({
                name: req.user.name,
                message: req.body.message
            })
            data.userId = req.user.id,
            data.adId = ad.id

            if(!ad) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }
            
            messagesFunctionals.createMessage(data)
                .then(() => {
                    req.flash('success_msg', 'Message sent successfully.')
                    return res.redirect(`/item/${ad.id}`)
                })
        })
        .catch(next)
}

module.exports = { getMessagePage, postMessagePage }