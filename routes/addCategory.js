const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const addCategoryMiddlwares = require('../middlewares/addcategoryMiddleware')

router.get('/',
    addCategoryMiddlwares.getCreateCategoryPage)

router.post('/',
    check.checkNotCateg,
    validationMiddlware.categValidation,
    addCategoryMiddlwares.createCategory,
    addCategoryMiddlwares.completeCreateCateg)

module.exports = router