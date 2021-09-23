const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const adsUserMiddlwares = require('../middlewares/adsUser_middleware')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    adsUserMiddlwares.getUserAdsPage)

module.exports = router