const router = require('express').Router()

const check = require('../middlewares/check')
const deleteCategoryMiddlware = require('../middlewares/deleteCategory_middleware.js')

router.get('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    deleteCategoryMiddlware.getDeleteCategoryPage)

router.post('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    deleteCategoryMiddlware.postDeleteCategoryPage)

module.exports = router