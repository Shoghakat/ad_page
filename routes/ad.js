const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const adMiddlware = require('../middlewares/ad_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    check.checkAuthenticated,
    adMiddlware.getCategsListPage)

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkCateg,
    adMiddlware.getCreateAdByCategPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    check.checkCateg,
    validationMiddlware.adValidation,
    adMiddlware.createAd,
    adMiddlware.createImagesByAdId,
    adMiddlware.completeCreateAd)

module.exports = router