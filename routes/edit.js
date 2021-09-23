const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const editMiddlwares = require('../middlewares/edit_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    editMiddlwares.getEditAdPage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    validationMiddlware.adValidationEdit,
    editMiddlwares.updateAd)

module.exports = router