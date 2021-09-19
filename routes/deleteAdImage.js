const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteAdImageMiddlware = require('../middlewares/deleteAdImage_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlware.getDeleteAdImagePage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlware.deleteAdImage,
    removeFiles.removeAdImage,
    deleteAdImageMiddlware.postDeleteAdImagePage)

module.exports = router