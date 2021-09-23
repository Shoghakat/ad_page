const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const categoryMiddlwares = require('../middlewares/category_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCategByParams,
    categoryMiddlwares.getAdsByCategoryPage)

module.exports = router