const { messagesFunctionals } = require('../models/functionals/functionals')
const messageFunctionals = new messagesFunctionals.methods()

const getMessagePage = (req, res, next) => {
    const ad = req.ad
    return res.render('message', { ad: ad })
}

const postMessagePage = (req, res, next) => {
    const ad = req.ad
    
    const data = req.body
    data.userId = req.user.id,
    data.adId = ad.id
    
    messageFunctionals.createMessage(data)
        .then(() => {
            req.flash('success_msg', 'Message sent successfully.')
            return res.json({ message: 'Message sent successfully' })
        })
        .catch(next)
}

module.exports = { getMessagePage, postMessagePage }