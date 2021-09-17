const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const addCategoryMiddlware = require('../middlewares/addCategory_middleware')

router.get('/',
    check.checkAuthenticated,
    check.checkAdmin,
    addCategoryMiddlware.getCreateCategoryPage)

router.post('/',
    check.checkAuthenticated,
    check.checkAdmin,
    addCategoryMiddlware.createCategory)

module.exports = router