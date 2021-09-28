const { adsImagesFunctionals } = require('../models/functionals/functionals')
const adImagesFunctionals = new adsImagesFunctionals.methods()

const getDeleteAdImagePage = (req, res, next) => {
    const image = req.image
    res.render('deleteAdImage', { image: image })
}


const deleteAdImage = (req, res, next) => {
    const image = req.image
    adImagesFunctionals.deleteImage(image.id)
        .then(() => next())
        .catch(next)
}


const postDeleteAdImagePage = (req, res, next) => {
    req.flash('success_msg', 'Image deleted successfully.')
    return res.json({ message: 'File deleted successfully' })
}


module.exports = {
    getDeleteAdImagePage,
    deleteAdImage,
    postDeleteAdImagePage
}