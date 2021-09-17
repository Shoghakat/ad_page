const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const editMiddlware = require('../middlewares/edit_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    editMiddlware.getEditAdPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    validationMiddlware.adValidationEdit,
    editMiddlware.createImageByAdId,
    editMiddlware.updateAd)

module.exports = router