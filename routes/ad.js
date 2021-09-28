const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const adMiddlwares = require('../middlewares/adMiddleware')
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