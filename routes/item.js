const router = require('express').Router()

const validationMiddlware = require('../middlewares/validation_middleware')
const itemMiddlware = require('../middlewares/item_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    itemMiddlware.getItemPage)

module.exports = router