const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const addCategoryMiddlwares = require('../middlewares/addCategory_middleware')
const { addCategory } = require('./routesExport')

router.get('/',
    addCategoryMiddlwares.getCreateCategoryPage)

router.post('/',
    check.checkNotCateg,
    addCategoryMiddlwares.createCategory,
    addCategoryMiddlwares.completeCreateCateg)

module.exports = router