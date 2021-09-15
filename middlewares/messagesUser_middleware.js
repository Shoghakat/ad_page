const { Op } = require('sequelize')
const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getMessagesUserPage = async (req, res, next) => {
    const ads = await adsFunctionals.findAdsWhere({ userId: req.user.id })
    const ids = await Promise.map(ads, el => el.id)
    const messagesUser = await messagesFunctionals.findMessagesWhere({ [Op.or]: [{ userId: req.user.id }, { adId: { [Op.or] : ids } }] })
    
    await Promise.map(messagesUser, async  message => {
        const ad = await adsFunctionals.findOneAd({ id: message.adId })
        const user = await usersFunctionals.findOneUser({ id: message.userId })
        message.adTitle = ad.title
        message.userName = user.name
        return message
    })
    res.render('messagesUser', { user: req.user, messagesUser: messagesUser })
}

const getMessageByIdPage = async (req, res, next) => {
    const id = req.params.id
    const message = await messagesFunctionals.findMessageById(id)

    const ad = await adsFunctionals.findOneAd({ id: message.adId })
    
    if(message) {
        if(message.userId === req.user.id || ad.userId === req.user.id) {
            res.render('messageSingle', { user: req.user, message: message })
        } else {
            const err = `The message with id ${id} does not belong to you`
            res.render('error', { user: req.user, err: err })
        }
    } else {
        const err = `There is no message with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

const postMessageByIdPage = async (req, res, next) => {
    const id = req.params.id
    const message = await messagesFunctionals.findMessageById(id)

    const data = message
    data.messages.push({
        name: req.user.name,
        message: req.body.message
    })

    if(message) {
        await messagesFunctionals.updateMessage(data, { id: id })
        req.flash('success_msg', 'Message sent successfully.')
        res.redirect('/user/messages')
    } else {
        const err = `There is no message with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = {
    getMessagesUserPage,
    getMessageByIdPage,
    postMessageByIdPage
}