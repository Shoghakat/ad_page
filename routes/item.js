const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const itemMiddlwares = require('../middlewares/item_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    itemMiddlwares.getItemPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    upload.uploadFiles,
    itemMiddlwares.postItemPage,
    check.checkImagesNumber,
    validationMiddlware.imagesItemValidation,
    itemMiddlwares.createImagesByAdId)

module.exports = router