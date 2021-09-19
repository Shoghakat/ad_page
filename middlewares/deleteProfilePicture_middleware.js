const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


const getDeleteProfilePicturePage = (req, res, next) => {
    res.render('deleteProfilePicture')
}


const deleteProfilePicture = (req, res, next) => {
    usersFunctionals.updateUser({ image: null, imagePath: null }, { id: req.user.id })
        .then(() => {
            return next()
        })
        .catch(next)
}

const postProfilePicturePage = (req, res, next) => {
    req.flash('success_msg', 'Profile Picture deleted successfully.')
    return res.redirect('/profile/picture')
}


module.exports = {
    getDeleteProfilePicturePage,
    deleteProfilePicture,
    postProfilePicturePage
}