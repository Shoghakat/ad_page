const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


const checkAd = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    
    adsFunctionals.findOneAd({ id: id })
        .then(ad => {
            if(!ad) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }
            
            req.ad = ad
            next()
        })
        .catch(next)
}


const checkAdOwner = (req, res, next) => {
    const ad = req.ad

    if(req.user.id !== ad.userId) {
        req.flash('error_msg', 'Post cannot be deleted since it does not belong to you.')
        return res.redirect(`/delete/ad/${ad.id}`)
    }

    return next()
}


const getDeleteAdPage = (req, res, next) => {
    const ad = req.ad
    res.render('deleteAd', { ad: ad })
}


const deleteAd = (req, res, next) => {
    const ad = req.ad
    
    adsFunctionals.deleteAd({ id: ad.id })
        .then(() => {
            req.flash('success_msg', 'Post deleted successfully.')
            return res.redirect('/account')
        })
        .catch(next)
}


module.exports = {
    getDeleteAdPage,
    checkAd,
    checkAdOwner,
    deleteAd
}