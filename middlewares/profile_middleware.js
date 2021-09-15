const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')

const getProfilePage = async (req, res, next) => {
    const id = req.user.id
    const userById = await usersFunctionals.findUserById(id)

    res.render('profile', { user: userById })
}

const getProfileByIdPage = async (req, res, next) => {
    const id = req.params.id
    const userById = await usersFunctionals.findUserById(req.user.id)
    const userOwner = await usersFunctionals.findUserById(id)
    if(userOwner) {
        const ads = await adsFunctionals.findAdsWhere({ userId: id })
        res.render('userAds', { user: userById, userOwner: userOwner, ads: ads })
    } else {
        const err = `There is no user with id ${id}`
        res.render('error', { user: req.user, err: err })
    }
    
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
    res.redirect('/profile')
}

module.exports = { getProfilePage, getProfileByIdPage, postProfilePage }