const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const deleteCategoryMiddlwares = require('../middlewares/deletecategoryMiddleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    deleteCategoryMiddlwares.getDeleteCategoryPage)

router.delete('/:id',
    validationMiddlware.paramValidation,
    check.checkCateg,
    check.checkHasChildOrAd,
    deleteCategoryMiddlwares.deleteCateg)

module.exports = router