const router = require('express').Router()

const validationMiddlware = require('../middlewares/validationMiddleware')
const adsUserMiddlwares = require('../middlewares/adsUserMiddleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    adsUserMiddlwares.getUserAdsPage)

module.exports = router