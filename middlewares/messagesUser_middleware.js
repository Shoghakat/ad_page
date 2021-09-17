const { Op } = require('sequelize')
const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getUserMessagesPage = async (req, res, next) => {
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
    res.render('messagesUser', { messagesUser: messagesUser })
}

const getMessageByIdPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    
    messagesFunctionals.findMessageById(id)
        .then(message => {
            adsFunctionals.findOneAd({ id: message.adId })
                .then(ad => {
                    if(!message) {
                        const err = `There is no message with id ${id}`
                        return res.render('error', { err: err })
                    }
                    
                    if(message.userId !== req.user.id && ad.userId !== req.user.id) {
                        const err = `The message with id ${id} does not belong to you`
                        return res.render('error', { err: err })
                    }
                    
                    return res.render('messageSingle', { message: message })
                })
        })
        .catch(next)
}

const postMessageByIdPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    messagesFunctionals.findMessageById(id)
        .then(message => {
            const data = message
            data.messages.push({
                name: req.user.name,
                message: req.body.message
            })

            if(!message) {
                const err = `There is no message with id ${id}`
                return res.render('error', { err: err })
            }
            
            messagesFunctionals.updateMessage(data, { id: id })
                .then(() => {
                    req.flash('success_msg', 'Message sent successfully.')
                    return res.redirect('/user/messages')
                })
        })
        .catch(next)
}

module.exports = {
    getUserMessagesPage,
    getMessageByIdPage,
    postMessageByIdPage
}