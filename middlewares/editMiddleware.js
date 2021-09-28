const adsFunctionals = require('../models/functionals/adsFunctionals')
const adsImagesFunctionals = require('../models/functionals/adsImagesFunctionals')

const adFunctionals = new adsFunctionals.methods()
const adImagesFunctionals = new adsImagesFunctionals.methods()

const getEditAdPage = (req, res, next) => {
    const ad = req.ad
    adImagesFunctionals.findImagesByAdId(ad.id)
        .then(data => {
            return res.render('edit', { ad: ad, images: data })
        })
        .catch(next)
}

const updateAd = (req, res, next) => {
    const ad = req.ad
    adFunctionals.updateAd(req.body, ad.id)
        .then(() => {
            req.flash('success_msg', 'Post updated successfully.')
            return res.json({ message: 'Post updated successfully' })
        }) 
        .catch(next)   
}

module.exports = {
    getEditAdPage,
    updateAd
}