const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteAdMiddlware = require('../middlewares/deleteAd_middleware')

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    deleteAdMiddlware.getDeleteAdPage)

router.post('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    deleteAdMiddlware.postDeleteAdPage)

module.exports = router