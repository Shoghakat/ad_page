const router = require('express').Router()

const check = require('../middlewares/check')
const loginMiddlware = require('../middlewares/login_middleware')

router.get('/',
    check.checkAuthenticated,
    loginMiddlware.getLoginPage)

router.post('/',
    check.checkAuthenticated,
    loginMiddlware.postLoginPage)

module.exports = router