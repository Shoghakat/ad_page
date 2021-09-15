const router = require('express').Router()

const check = require('../middlewares/check')
const accountMiddlware = require('../middlewares/account_middleware')

router.get('/',
    check.checkNotAuthenticated,
    accountMiddlware.getAccountPage)

module.exports = router