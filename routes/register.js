const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddleware = require('../middlewares/validation_middleware')
const registerMiddlware = require('../middlewares/register_middleware')

router.get('/',
    check.checkNotAuthenticated,
    registerMiddlware.getRegisterPage)

router.post('/',
    check.checkNotAuthenticated,
    validationMiddleware.userValidation,
    registerMiddlware.postRegisterPage)

module.exports = router