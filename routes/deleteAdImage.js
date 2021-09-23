const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteAdImageMiddlwares = require('../middlewares/deleteAdImage_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlwares.getDeleteAdImagePage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlwares.deleteAdImage,
    removeFiles.removeAdImage,
    deleteAdImageMiddlwares.postDeleteAdImagePage)

module.exports = router