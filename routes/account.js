const router = require('express').Router()

const check = require('../middlewares/check')
const accountMiddlware = require('../middlewares/account_middleware')

router.get('/',
    check.checkAuthenticated,
    accountMiddlware.getAccountPage)

module.exports = router