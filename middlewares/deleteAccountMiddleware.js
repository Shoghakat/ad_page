const usersFunctionals = require('../models/functionals/usersFunctionals')
const adsFunctionals = require('../models/functionals/adsFunctionals')
const messagesFunctionals = require('../models/functionals/messagesFunctionals')

const userFunctionals = new usersFunctionals.methods()
const adFunctionals = new adsFunctionals.methods()
const messageFunctionals = new messagesFunctionals.methods()

const getDeleteAccountPage = (req, res, next) => res.render('deleteAccount')

const deleteMessagesByUser = (req, res, next) => {
    adFunctionals.findAdsByUserId(req.user.id)
        .then(ads => {
            const ids = ads.map(el => el.id)
            messageFunctionals.deleteMessages(req.user.id, ids)
                .then(() => next())
        })
        .catch(next)
}

const deleteAdsByUser = (req, res, next) => {
    adFunctionals.deleteAd(req.user.id)
        .then(() => next())
        .catch(next)
}

const deleteAccount = (req, res, next) => {
    const id = req.user.id
    req.logOut()
    userFunctionals.deleteUser(id)
        .then(() => {
            req.flash('success_msg', 'Account deleted successfully.')
            return res.json({ message: 'Account deleted successfully' })
        })
        .catch(next)
}

module.exports = {
    getDeleteAccountPage,
    deleteMessagesByUser,
    deleteAdsByUser,
    deleteAccount
}