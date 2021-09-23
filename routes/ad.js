const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const adMiddlwares = require('../middlewares/ad_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    check.checkAuthenticated,
    adMiddlwares.getCategsListPage)

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkCateg,
    adMiddlwares.getCreateAdByCategPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    check.checkCateg,
    validationMiddlware.adValidation,
    adMiddlwares.createAd,
    validationMiddlware.imagesAdValidation,
    adMiddlwares.createImagesByAdId,
    adMiddlwares.completeCreateAd)

module.exports = router