const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const editMiddlware = require('../middlewares/edit_middleware')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    editMiddlware.getEditAdPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    validationMiddlware.adValidationEdit,
    editMiddlware.updateAd)

module.exports = router