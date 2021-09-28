const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validationMiddleware')
const registerMiddlwares = require('../middlewares/registerMiddleware')

router.get('/',
    check.checkNotAuthenticated,
    registerMiddlwares.getRegisterPage)

router.post('/',
    check.checkNotAuthenticated,
    validationMiddleware.userValidation,
    check.checkNotUser,
    registerMiddlwares.postRegisterPage)

module.exports = router