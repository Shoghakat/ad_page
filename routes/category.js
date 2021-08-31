const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const categoryMiddlware = require('../middlewares/category_middleware.js')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    categoryMiddlware.getCategoryPage)

module.exports = router