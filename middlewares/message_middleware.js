const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getMessagePage = async (req, res, next) => {
    const id = req.params.id
    const ad = await adsFunctionals.findOneAd({ id: id })

    if(ad) {
        res.render('message', { user: req.user, ad: ad })
    } else {
        const err = `There is no ad with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

const postMessagePage = async (req, res, next) => {
    const id = req.params.id
    const ad = await adsFunctionals.findOneAd({ id: id })

    const data = {}
    data.messages = []
    data.messages.push({
        name: req.user.name,
        message: req.body.message
    })
    data.userId = req.user.id,
    data.adId = ad.id

    if(ad) {
        await messagesFunctionals.createMessage(data)
        req.flash('success_msg', 'Message sent successfully.')
        res.redirect(`/item/${ad.id}`)
    } else {
        const err = `There is no ad with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getMessagePage, postMessagePage }