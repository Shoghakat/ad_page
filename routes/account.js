const router = require('express').Router()

const check = require('../middlewares/check')
const accountMiddlwares = require('../middlewares/account_middleware')

router.get('/',
    accountMiddlwares.getAccountPage)

module.exports = router