const router = require('express').Router()

const check = require('../middlewares/check')
const accountMiddlwares = require('../middlewares/account_middleware')

router.get('/',
    check.checkAuthenticated,
    accountMiddlwares.getAccountPage)

module.exports = router