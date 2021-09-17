const router = require('express').Router()

const check = require('../middlewares/check')
const loginMiddlware = require('../middlewares/login_middleware')

router.get('/',
    check.checkNotAuthenticated,
    loginMiddlware.getLoginPage)

router.post('/',
    check.checkNotAuthenticated,
    loginMiddlware.postLoginPage)

module.exports = router