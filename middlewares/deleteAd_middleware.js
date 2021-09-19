const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')


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
    deleteAd
}