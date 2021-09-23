const router = require('express').Router()

const check = require('../middlewares/check')
const deleteCategoryMiddlwares = require('../middlewares/deleteCategory_middleware')

router.get('/',
    check.checkAuthenticated,
    check.checkAdmin,
    deleteCategoryMiddlwares.getDeleteCategoryPage)

router.post('/',
    check.checkAuthenticated,
    check.checkAdmin,
    check.checkCategByName,
    check.checkHasChildOrAd,
    deleteCategoryMiddlwares.deleteCateg)

module.exports = router