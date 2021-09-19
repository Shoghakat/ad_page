const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getProfilePicturePage = (req, res, next) => {
    return res.render('profilePicture')
}

const postProfilePicturePage = (req, res, next) => {
    if(!req.file) {
        return res.redirect('/profile')
    }
    return next()
}

const completePostProfilePicture = (req, res, next) => {
    const user = req.user
    const image = {
        image: req.file.filename,
        imagePath: req.file.path
    }
    usersFunctionals.updateUser(image, { id: user.id })
        .then(() => {
            req.flash('success_msg', 'Profile Picture updated successfully.')
            return res.redirect('/profile')
        })
        .catch(next)
}

module.exports = {
    getProfilePicturePage,
    postProfilePicturePage,
    completePostProfilePicture
}