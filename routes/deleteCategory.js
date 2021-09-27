const router = require('express').Router()

const check = require('../middlewares/check')
const deleteCategoryMiddlwares = require('../middlewares/deleteCategory_middleware')

router.get('/:id',
    deleteCategoryMiddlwares.getDeleteCategoryPage)

router.delete('/:id',
    check.checkCateg,
    check.checkHasChildOrAd,
    deleteCategoryMiddlwares.deleteCateg)

module.exports = router