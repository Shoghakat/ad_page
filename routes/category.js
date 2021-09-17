const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const categoryMiddlware = require('../middlewares/category_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    categoryMiddlware.getAdsByCategoryPage)

module.exports = router