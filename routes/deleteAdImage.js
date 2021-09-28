const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const deleteAdImageMiddlwares = require('../middlewares/deleteAdImageMiddleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlwares.getDeleteAdImagePage)

router.delete('/:id',
    validationMiddlware.paramValidation,
    check.checkImage,
    check.checkImageOwner,
    deleteAdImageMiddlwares.deleteAdImage,
    removeFiles.removeAdImage,
    deleteAdImageMiddlwares.postDeleteAdImagePage)

module.exports = router