const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const addCategoryMiddlwares = require('../middlewares/addCategory_middleware')

router.get('/',
    check.checkAuthenticated,
    check.checkAdmin,
    addCategoryMiddlwares.getCreateCategoryPage)

router.post('/',
    check.checkAuthenticated,
    check.checkAdmin,
    addCategoryMiddlwares.createCategory)

module.exports = router