const router = require('express').Router()

const check = require('../middlewares/check')
const deleteCategoryMiddlwares = require('../middlewares/deleteCategory_middleware')

router.get('/',
    deleteCategoryMiddlwares.getDeleteCategoryPage)

router.post('/',
    check.checkCategByBody,
    check.checkHasChildOrAd,
    deleteCategoryMiddlwares.deleteCateg)

module.exports = router