const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteAdMiddlwares = require('../middlewares/deleteAd_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    deleteAdMiddlwares.getDeleteAdPage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    check.checkAdOwner,
    removeFiles.removeAdImages,
    deleteAdMiddlwares.deleteAd)

module.exports = router