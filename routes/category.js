const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const categoryMiddlwares = require('../middlewares/categoryMiddleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    categoryMiddlwares.getAdsByCategoryPage)

module.exports = router