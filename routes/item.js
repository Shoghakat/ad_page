const router = require('express').Router()

const validationMiddlware = require('../middlewares/validation_middleware.js')
const itemMiddlware = require('../middlewares/item_middleware.js')

router.get('/:id',
    validationMiddlware.paramValidation,
    itemMiddlware.getItemPage)

router.get('/:id/images',
    validationMiddlware.paramValidation,
    itemMiddlware.getItemImagesPage)

module.exports = router