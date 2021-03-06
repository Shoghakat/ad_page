const { messagesFunctionals } = require('../models/functionals/functionals')
const messageFunctionals = new messagesFunctionals.methods()

const { getUserMessagesById } = require('./utilities/queries')

const getUserMessagesPage = (req, res, next) => {
    const id = req.user.id
    getUserMessagesById(id)
        .then(data => res.render('messagesUser', { messagesUser: data }))
        .catch(next)
}

const getMessagesByConvIdPage = (req, res, next) => {
    const message = req.message
    const ad = req.ad
    messageFunctionals.findMessagesByConvId(message.id)
        .then(messages => {
            messages.unshift(message)
            return res.render('messageSingle', { conversation: messages, ad: ad })
        })
        .catch(next)
}


const postMessagesByConvIdPage = (req, res, next) => {
    const message = req.message

    const data = req.body
    data.userId = req.user.id,
    data.adId = message.adId,
    data.conversationId = message.id

    messageFunctionals.createMessage(data)
        .then(() => {
            req.flash('success_msg', 'Message sent successfully.')
            res.json({ message: 'Message sent successfully' })
        })
        .catch(next)
}

module.exports = {
    getUserMessagesPage,
    getMessagesByConvIdPage,
    postMessagesByConvIdPage
}