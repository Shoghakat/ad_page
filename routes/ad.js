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
    adMiddlware.checkCateg,
    adMiddlware.getCreateAdByCategPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    adMiddlware.checkCateg,
    validationMiddlware.adValidation,
    adMiddlware.createAd,
    adMiddlware.createImageByAdId,
    adMiddlware.completeCreateAd)

module.exports = router