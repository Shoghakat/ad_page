const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const editMiddlwares = require('../middlewares/editMiddleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    editMiddlwares.getEditAdPage)

router.put('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    validationMiddlware.adValidationEdit,
    editMiddlwares.updateAd)

module.exports = router