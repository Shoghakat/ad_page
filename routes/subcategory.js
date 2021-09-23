const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const subcategoryMiddlwares = require('../middlewares/subcategory_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    subcategoryMiddlwares.getSubcategoryPage)

module.exports = router