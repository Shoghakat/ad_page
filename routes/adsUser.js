const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const adsUserMiddlware = require('../middlewares/adsUser_middleware')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    adsUserMiddlware.getUserAdsPage)

module.exports = router