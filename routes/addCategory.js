const router = require('express').Router()

const check = require('../middlewares/check')
const addCategoryMiddlwares = require('../middlewares/addCategory_middleware')

router.get('/',
    addCategoryMiddlwares.getCreateCategoryPage)

router.post('/',
    check.checkNotCateg,
    addCategoryMiddlwares.createCategory,
    addCategoryMiddlwares.completeCreateCateg)

module.exports = router