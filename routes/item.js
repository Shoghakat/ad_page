const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const itemMiddlwares = require('../middlewares/itemMiddleware')
const removeFiles = require('../middlewares/removeFiles')

const upload = require('../middlewares/uploadfiles')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    itemMiddlwares.getItemPage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    upload.uploadFiles,
    itemMiddlwares.postItemPage,
    check.checkImagesNumber,
    itemMiddlwares.createImagesByAdId)

router.delete('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    removeFiles.removeAdImages,
    itemMiddlwares.deleteMessagesByAdId,
    itemMiddlwares.deleteAd)

module.exports = router