const { Op } = require('sequelize')
const Promise = require('bluebird')

const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')
const messagesFunctionals = require('../models/messages_functionals.js')

const getMessagesUserPage = async (req, res, next) => {
    const messagesUser = await messagesFunctionals.findMessagesWhere({ [Op.or]: [{ userId: req.user.id }, { receiverId: req.user.id }] })
    await Promise.map(messagesUser, async  message => {
        let ad = await adsFunctionals.findAdById(message.adId)
        let user = await usersFunctionals.findUserById(message.userId)
        message.adTitle = ad.title
        message.userName = user.name
        return message
    })
    res.render('messagesUser', { user: req.user, messagesUser: messagesUser })
}

const getMessageByIdPage = async (req, res, next) => {
    const id = req.params.id
    const message = await messagesFunctionals.findMessageById(id)
    
    if(message) {
        if(message.userId === req.user.id || message.receiverId === req.user.id) {
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
        res.redirect('/test/user/messages')
    } else {
        const err = `There is no message with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getMessagesUserPage, getMessageByIdPage, postMessageByIdPage }