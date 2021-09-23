const router = require('express').Router()

const check = require('../middlewares/check')
const loginMiddlwares = require('../middlewares/login_middleware')

router.get('/',
    check.checkNotAuthenticated,
    loginMiddlwares.getLoginPage)

router.post('/',
    check.checkNotAuthenticated,
    loginMiddlwares.postLoginPage)

module.exports = router