const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware.js')
const registerMiddlware = require('../middlewares/register_middleware.js')

router.get('/',
    check.checkAuthenticated,
    registerMiddlware.getRegisterPage)

router.post('/',
    check.checkAuthenticated,
    validationMiddleware.userValidation,
    registerMiddlware.postRegisterPage)

module.exports = router