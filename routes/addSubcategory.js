const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware.js')
const addSubcategoryMiddlware = require('../middlewares/addSubcategory_middleware.js')

router.get('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    addSubcategoryMiddlware.getAddSubcategoryPage)

router.post('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    addSubcategoryMiddlware.postAddSubcategoryPage)

module.exports = router