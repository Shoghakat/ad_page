const router = require('express').Router()

const check = require('../middlewares/check')
const deleteCategoryMiddlware = require('../middlewares/deleteCategory_middleware')

router.get('/',
    check.checkAuthenticated,
    check.checkAdmin,
    deleteCategoryMiddlware.getDeleteCategoryPage)

router.post('/',
    check.checkAuthenticated,
    check.checkAdmin,
    deleteCategoryMiddlware.checkCateg,
    deleteCategoryMiddlware.checkHasChildCateg,
    deleteCategoryMiddlware.checkHasAd,
    deleteCategoryMiddlware.deleteCateg)

module.exports = router