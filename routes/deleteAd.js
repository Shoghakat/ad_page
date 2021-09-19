const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteAdMiddlware = require('../middlewares/deleteAd_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    deleteAdMiddlware.getDeleteAdPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    removeFiles.removeAdImages,
    deleteAdMiddlware.deleteAd)

module.exports = router