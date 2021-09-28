const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const subcategoryMiddlwares = require('../middlewares/subcategoryMiddleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    subcategoryMiddlwares.getSubcategoryPage)

module.exports = router