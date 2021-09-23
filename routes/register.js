const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const registerMiddlwares = require('../middlewares/register_middleware')

router.get('/',
    check.checkNotAuthenticated,
    registerMiddlwares.getRegisterPage)

router.post('/',
    check.checkNotAuthenticated,
    validationMiddleware.userValidation,
    registerMiddlwares.postRegisterPage)

module.exports = router