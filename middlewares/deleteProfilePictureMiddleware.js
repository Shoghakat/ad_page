const { usersFunctionals } = require('../models/functionals/functionals')
const userFunctionals = new usersFunctionals.methods()

const getDeleteProfilePicturePage = (req, res, next) => {
    res.render('deleteProfilePicture')
}

const deleteProfilePicture = (req, res, next) => {
    const data = { image: null, imagePath: null }
    userFunctionals.updateUser(data, req.user.id)
        .then(() => {
            return next()
        })
        .catch(next)
}

const postProfilePicturePage = (req, res, next) => {
    req.flash('success_msg', 'Profile Picture deleted successfully.')
    return res.json({ message: 'Profile Picture deleted successfully' })
}


module.exports = {
    getDeleteProfilePicturePage,
    deleteProfilePicture,
    postProfilePicturePage
}