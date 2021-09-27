const usersFunctionals = require('../models/functionals/users_functionals')
const userFunctionals = new usersFunctionals.methods()

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
    const image = {
        image: req.file.filename,
        imagePath: req.file.path
    }
    userFunctionals.updateUser(image, req.user.id)
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