const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const itemMiddlware = require('../middlewares/item_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    itemMiddlware.getItemPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    upload.uploadFiles,
    // validationMiddlware.imageValidation,
    check.checkImagesNumber,
    itemMiddlware.createImagesByAdId)

module.exports = router