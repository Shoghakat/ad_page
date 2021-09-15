const usersFunctionals = require('../models/users_functionals')
const adsFunctionals = require('../models/ads_functionals')
const categsFunctionals = require('../models/categories_functionals')

const getEditPage = async (req, res, next) => {
    const adById = await adsFunctionals.findAdById(req.params.id)

    if(adById) {
        res.render('edit', { user: req.user, ad: adById })
    } else {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }
}


const postEditPage = async (req, res, next) => {
    const id = Number(req.params.id)
    const ad = await adsFunctionals.findAdById(id)

    if(!ad) {
        const err = `There is no ad with id ${req.params.id}`
        res.render('error', { user: req.user, err: err })
    }

    const data = req.body
    data.image = ad.image

    if(req.body.delete === 'true') {
        data.image = null
    }
    if(req.files.length > 0) {
        if(data.image) {
            req.files.forEach(el => data.image.push(el.filename))
        } else {
            data.image = req.files.map(el => el.filename)
        }
    }

    if(data.image && data.image.length > 5) {
        req.flash('error_msg', 'More than 5 files cannot be posted.')
        res.redirect(`/edit/${ad.id}`)
    } else {
        if(req.user.id === ad.userId) {
            await adsFunctionals.updateAd(data, { id: id })
            req.flash('success_msg', 'Post updated successfully.')
            res.redirect('/account')
        } else {
            req.flash('error_msg', 'Post cannot be edited since it does not belong to you.')
            res.redirect(`/edit/${ad.id}`)
        }
    }
}

module.exports = { getEditPage, postEditPage }