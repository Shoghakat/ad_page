const usersFunctionals = require('../models/users_functionals.js')
const adsFunctionals = require('../models/ads_functionals.js')
const categsFunctionals = require('../models/categories_functionals.js')

const getProfilePage = async (req, res, next) => {
    const id = req.user.id
    const userById = await usersFunctionals.findUserById(id)

    res.render('profile', { user: userById })
}

const postProfilePage = async (req, res, next) => {
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

    await usersFunctionals.updateUser(data, { id: user.id })

    req.flash('success_msg', 'Profile updated successfully.')
    res.redirect('/test/profile')
}

module.exports = { getProfilePage, postProfilePage }