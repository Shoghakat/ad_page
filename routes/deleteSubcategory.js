const router = require('express').Router()

const check = require('../middlewares/check')
const deleteSubcategoryMiddlware = require('../middlewares/deleteSubcategory_middleware.js')

router.get('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    deleteSubcategoryMiddlware.getDeleteSubcategoryPage)

router.post('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    deleteSubcategoryMiddlware.postDeleteSubcategoryPage)

module.exports = router