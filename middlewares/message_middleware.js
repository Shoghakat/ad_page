const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')
const messagesFunctionals = require('../models/messages_functionals.js')

const getMessagePage = async (req, res, next) => {
    const id = req.params.id
    const ad = await adsFunctionals.findAdById(id)

    if(ad) {
        res.render('message', { ad: ad })
    } else {
        const err = `There is no ad with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

const postMessagePage = async (req, res, next) => {
    const id = req.params.id
    const ad = await adsFunctionals.findAdById(id)

    const data = req.body
    data.userId = ad.userId,
    data.adId = ad.id

    if(ad) {
        await messagesFunctionals.createMessage(data)
        req.flash('success_msg', 'Message sent successfully.')
        res.redirect(`/test/item/${ad.id}`)
    } else {
        const err = `There is no ad with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getMessagePage, postMessagePage }