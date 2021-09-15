const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const addSubcategoryMiddlware = require('../middlewares/addSubcategory_middleware')

router.get('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    addSubcategoryMiddlware.getAddSubcategoryPage)

router.post('/',
    check.checkNotAuthenticated,
    check.checkNotAdmin,
    addSubcategoryMiddlware.postAddSubcategoryPage)

module.exports = router