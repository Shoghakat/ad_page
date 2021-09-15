const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const subcategoryMiddlware = require('../middlewares/subcategory_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    subcategoryMiddlware.getSubcategoryPage)

module.exports = router