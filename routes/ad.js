const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const adMiddlwares = require('../middlewares/ad_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    adMiddlwares.getCategsListPage)

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    adMiddlwares.getCreateAdByCategPage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    upload.uploadFiles,
    validationMiddlware.adValidation,
    adMiddlwares.createAd,
    adMiddlwares.createImagesByAdId,
    adMiddlwares.completeCreateAd)

module.exports = router