const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')
const messagesFunctionals = require('../models/messages_functionals.js')

const getMessagesUserPage = async (req, res, next) => {
    const id = req.params.id
    const message = await messagesFunctionals.findMessageById(id)
    
    if(message) {
        if(message.userId === req.user.id) {
            res.render('messagesUser', { user: req.user, message: message })
        } else {
            const err = `The message with id ${id} does not belong to you`
            res.render('error', { user: req.user, err: err })
        }
    } else {
        const err = `There is no message with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
}

module.exports = { getMessagesUserPage }