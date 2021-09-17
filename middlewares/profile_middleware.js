const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getProfilePage = (req, res, next) => {
    const id = req.user.id
    
    usersFunctionals.findOneUser({ id: id })
        .then(user => {
            return res.render('profile', { user: user })
        })
        .catch(next)
}

const postProfilePage = (req, res, next) => {
    const user = req.user
    const data = req.body

    if(req.file) {
        data.image = req.file.filename
    } else {
        data.image = user.image
    }

    if(req.body.delete === 'true') {
        data.image = null
    }

    usersFunctionals.updateUser(data, { id: user.id })
        .then(() => {
            req.flash('success_msg', 'Profile updated successfully.')
            return res.redirect('/profile')
        })
        .catch(next)
}

module.exports = {
    getProfilePage,
    postProfilePage
}